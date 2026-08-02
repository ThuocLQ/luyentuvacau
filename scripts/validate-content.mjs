import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const visit = (directory) => readdirSync(directory).flatMap((entry) => {
  const path = join(directory, entry)
  return statSync(path).isDirectory() ? visit(path) : [path]
})

const files = [...visit('src'), ...visit('docs'), 'README.md', 'index.html']
const mojibake = /[\u00C3\u00C4\u00C2]|\u00E2\u20AC/
const invalid = files.filter(file => /\.(ts|tsx|md|html|css)$/.test(file) && mojibake.test(readFileSync(file, 'utf8')))
if (invalid.length) throw new Error(`Possible UTF-8 mojibake in: ${invalid.join(', ')}`)

const registry = readFileSync('src/data/docs.ts', 'utf8')
const importedContent = new Map([...registry.matchAll(/import (\w+) from '\.\.\/\.\.\/docs\/([^']+)\?raw'/g)].map(match => [match[1], join('docs', match[2])]))
const imports = [...importedContent.values()]
const missing = imports.filter(file => { try { readFileSync(file); return false } catch { return true } })
if (missing.length) throw new Error(`Registry imports missing content: ${missing.join(', ')}`)

const terminologySources = [...imports, 'src/data/quizzes.ts', 'src/data/glossary.ts']
const bannedEditorialPhrases = [
  'dấu nhận diện payload',
  'response được lưu bền',
  'bàn giao công việc có lưu bền',
  'nguồn dữ liệu đáng tin cậy cuối cùng',
  'phạm vi thiệt hại',
  'mở rộng nhiều phiên bản tiến trình',
  'làm vô hiệu bản sao dữ liệu',
  'khóa chống lặp',
  'mã chống trùng',
  'bộ nhớ đệm',
]
const terminologyErrors = terminologySources.flatMap(file => {
  const source = readFileSync(file, 'utf8').toLowerCase()
  return bannedEditorialPhrases.filter(phrase => source.includes(phrase)).map(phrase => `${file} (${phrase})`)
})
if (terminologyErrors.length) throw new Error(`Forced Vietnamese terminology found: ${terminologyErrors.join(', ')}`)

const contentSlugs = [...registry.matchAll(/\{ slug: '([^']+)'[^\n]*content:/g)].map(match => match[1])
const practicedSlugs = new Set([...registry.matchAll(/relatedDoc: '([^']+)'/g)].map(match => match[1]))
const withoutPractice = contentSlugs.filter(slug => !practicedSlugs.has(slug))
if (withoutPractice.length) throw new Error(`Complete cheatsheets without a linked practice question: ${withoutPractice.join(', ')}`)

const directiveTypes = new Set(['concept', 'definition', 'must-remember', 'example', 'note', 'warning', 'production-trap', 'senior-signal', 'interview-answer', 'comparison', 'final-recall'])
const directiveErrors = visit('docs').filter(file => file.endsWith('.md')).flatMap(file => [...readFileSync(file, 'utf8').matchAll(/^:::(.*?)$/gm)].map(match => ({ file, type: match[1].trim() })).filter(item => item.type && !directiveTypes.has(item.type)))
if (directiveErrors.length) throw new Error(`Invalid semantic directive: ${directiveErrors.map(item => `${item.file} (${item.type})`).join(', ')}`)
const malformedDirectives = visit('docs').filter(file => file.endsWith('.md')).flatMap(file => {
  const source = readFileSync(file, 'utf8')
  const markerCount = [...source.matchAll(/^:::\s*(?:[a-z-]+)?\s*$/gm)].length
  const empty = /^:::\s*[a-z-]+\s*\n\s*^:::\s*$/m.test(source)
  return markerCount % 2 || empty ? [file] : []
})
if (malformedDirectives.length) throw new Error(`Empty or unclosed semantic directive in: ${malformedDirectives.join(', ')}`)

const glossarySource = readFileSync('src/data/glossary.ts', 'utf8')
const glossaryIds = [...glossarySource.matchAll(/^\s*\['([^']+)'/gm)].map(match => match[1])
const duplicateGlossaryIds = glossaryIds.filter((id, index) => glossaryIds.indexOf(id) !== index)
if (duplicateGlossaryIds.length) throw new Error(`Duplicate glossary IDs: ${[...new Set(duplicateGlossaryIds)].join(', ')}`)
const glossaryDocRefs = [...glossarySource.matchAll(/, '([a-z-]+)'\],/g)].map(match => match[1])
const unknownGlossaryDocs = glossaryDocRefs.filter(slug => !contentSlugs.includes(slug))
if (unknownGlossaryDocs.length) throw new Error(`Glossary references unknown docs: ${[...new Set(unknownGlossaryDocs)].join(', ')}`)

const requiredEditorialSections = [
  'Trong 30 giây',
  'Gặp ở đâu ngoài đời?',
  'Hiểu đơn giản trước',
  'Cách quyết định, từng bước',
  'Chọn A hay B?',
  'Nếu có lỗi thì sao?',
  'Chứng minh mình làm đúng',
  'Nói trong phỏng vấn',
  'Interviewer thường hỏi tiếp',
  'Tự kiểm trước khi qua bài',
  'Nhớ một phút',
]
const editorialErrors = imports.flatMap(file => {
  const source = readFileSync(file, 'utf8')
  const missing = requiredEditorialSections.filter(section => !new RegExp(`^## ${section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'm').test(source))
  return missing.length ? [`${file} (thiếu: ${missing.join(', ')})`] : []
})
if (editorialErrors.length) throw new Error(`Published docs do not follow the editorial format: ${editorialErrors.join('; ')}`)

const quizSource = readFileSync('src/data/quizzes.ts', 'utf8')
const quizIds = [...quizSource.matchAll(/^\s{4}id: '([^']+)'/gm)].map(match => match[1])
if (quizIds.length < 18) throw new Error('Quiz bank needs at least 18 published case-based questions.')
const learningObjectiveCount = [...quizSource.matchAll(/\blearningObjective:/g)].length
if (learningObjectiveCount !== quizIds.length) throw new Error('Every quiz needs exactly one explicit learning objective.')
const duplicateQuizIds = quizIds.filter((id, index) => quizIds.indexOf(id) !== index)
if (duplicateQuizIds.length) throw new Error(`Duplicate quiz IDs: ${[...new Set(duplicateQuizIds)].join(', ')}`)
const quizDocRefs = [...quizSource.matchAll(/relatedDoc: '([^']+)'/g)].map(match => match[1])
const unknownQuizDocs = quizDocRefs.filter(slug => !contentSlugs.includes(slug))
if (unknownQuizDocs.length) throw new Error(`Quiz references unknown docs: ${[...new Set(unknownQuizDocs)].join(', ')}`)
const slugify = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
const docFilesBySlug = new Map([...registry.matchAll(/\{ slug: '([^']+)'[^\n]*content: (\w+)/g)].map(match => [match[1], importedContent.get(match[2])]))
const brokenQuizSections = [...quizSource.matchAll(/relatedDoc: '([^']+)', relatedSection: '([^']+)'/g)].flatMap(match => {
  const file = docFilesBySlug.get(match[1])
  if (!file) return [`${match[1]}#${match[2]}`]
  const headingIds = new Set([...readFileSync(file, 'utf8').matchAll(/^#{1,3}\s+(.+)$/gm)].map(heading => slugify(heading[1])))
  return headingIds.has(match[2]) ? [] : [`${match[1]}#${match[2]}`]
})
if (brokenQuizSections.length) throw new Error(`Quiz references missing doc sections: ${brokenQuizSections.join(', ')}`)
const quizRequirements = ['learningObjective:', 'correctOptionId:', 'scenario:', 'prompt:', 'options:', 'explanation:', 'recall:', 'followUp:']
const missingQuizFields = quizRequirements.filter(field => !quizSource.includes(field))
if (missingQuizFields.length) throw new Error(`Quiz bank missing required fields: ${missingQuizFields.join(', ')}`)

console.log(`Content validation passed for ${files.length} text files; every cheatsheet has linked practice, follows the editorial format, and has a valid quiz bank.`)
