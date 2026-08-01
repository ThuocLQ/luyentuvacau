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
const imports = [...registry.matchAll(/import \w+ from '\.\.\/\.\/docs\/([^']+)\?raw'/g)].map(match => join('docs', match[1]))
const missing = imports.filter(file => { try { readFileSync(file); return false } catch { return true } })
if (missing.length) throw new Error(`Registry imports missing content: ${missing.join(', ')}`)

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
const duplicateQuizIds = quizIds.filter((id, index) => quizIds.indexOf(id) !== index)
if (duplicateQuizIds.length) throw new Error(`Duplicate quiz IDs: ${[...new Set(duplicateQuizIds)].join(', ')}`)
const quizDocRefs = [...quizSource.matchAll(/relatedDoc: '([^']+)'/g)].map(match => match[1])
const unknownQuizDocs = quizDocRefs.filter(slug => !contentSlugs.includes(slug))
if (unknownQuizDocs.length) throw new Error(`Quiz references unknown docs: ${[...new Set(unknownQuizDocs)].join(', ')}`)
const quizRequirements = ['correctOptionId:', 'scenario:', 'prompt:', 'options:', 'explanation:', 'recall:', 'followUp:']
const missingQuizFields = quizRequirements.filter(field => !quizSource.includes(field))
if (missingQuizFields.length) throw new Error(`Quiz bank missing required fields: ${missingQuizFields.join(', ')}`)

console.log(`Content validation passed for ${files.length} text files; every cheatsheet has linked practice, follows the editorial format, and has a valid quiz bank.`)
