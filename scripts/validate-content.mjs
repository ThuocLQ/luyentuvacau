import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

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

const styleWarnings = []

const terminologySources = [...imports, 'src/data/docs.ts', 'src/data/quizzes.ts', 'src/data/glossary.ts']
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
  'trạng thái/kết quả bền',
  'mã thao tác',
  'đường khôi phục',
  'dấu vết kiểm tra',
  'bộ gom rác',
  'ảnh chụp bộ nhớ',
  'tái sử dụng vùng nhớ',
  'người dùng cuối cùng của buffer',
  'giới hạn song song',
  'tải từ phía sau',
]
const terminologyWarnings = terminologySources.flatMap(file => {
  const source = readFileSync(file, 'utf8').toLowerCase()
  return bannedEditorialPhrases.filter(phrase => source.includes(phrase)).map(phrase => `${file} (${phrase})`)
})
if (terminologyWarnings.length) styleWarnings.push(`awkward translations: ${terminologyWarnings.join(', ')}`)

const registryEntries = [...registry.matchAll(/\{ slug: '([^']+)'[^\n]*?order: (\d+)[^\n]*?content: (\w+)/g)]
  .map(match => ({ slug: match[1], order: Number(match[2]), contentImport: match[3] }))
const duplicateValues = values => values.filter((value, index) => values.indexOf(value) !== index)
const duplicateSlugs = duplicateValues(registryEntries.map(entry => entry.slug))
if (duplicateSlugs.length) throw new Error(`Duplicate document slugs: ${[...new Set(duplicateSlugs)].join(', ')}`)
const duplicateOrders = duplicateValues(registryEntries.map(entry => entry.order))
if (duplicateOrders.length) throw new Error(`Duplicate document orders: ${[...new Set(duplicateOrders)].join(', ')}`)
const missingContentMetadata = registryEntries.filter(entry => !importedContent.has(entry.contentImport))
if (missingContentMetadata.length) throw new Error(`Document content imports missing metadata: ${missingContentMetadata.map(entry => entry.slug).join(', ')}`)
const questionIds = [...registry.matchAll(/\{ id: '([^']+)'[^\n]*?relatedDoc: '/g)].map(match => match[1])
const duplicateQuestionIds = duplicateValues(questionIds)
if (duplicateQuestionIds.length) throw new Error(`Duplicate interview question IDs: ${[...new Set(duplicateQuestionIds)].join(', ')}`)
const contentSlugs = [...registry.matchAll(/\{ slug: '([^']+)'[^\n]*content:/g)].map(match => match[1])
const practicedSlugs = new Set([...registry.matchAll(/relatedDoc: '([^']+)'/g)].map(match => match[1]))
const withoutPractice = contentSlugs.filter(slug => !practicedSlugs.has(slug))
if (withoutPractice.length) styleWarnings.push(`cheatsheets without linked practice: ${withoutPractice.join(', ')}`)

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

const glossaryTerms = [...glossarySource.matchAll(/^\s*\['([^']+)', '([^']+)'/gm)].map(match => ({ id: match[1], term: match[2] }))
const glossaryKeys = new Set(glossaryTerms.flatMap(item => [item.id.toLowerCase(), item.term.toLowerCase()]))
const brokenGlossaryRefs = visit('docs').filter(file => file.endsWith('.md')).flatMap(file => {
  const source = readFileSync(file, 'utf8')
  return [...source.matchAll(/\[\[([^\]]+)\]\]/g)]
    .map(match => match[1].trim())
    .filter(reference => !glossaryKeys.has(reference.toLowerCase()))
    .map(reference => `${file} ([[${reference}]])`)
})
if (brokenGlossaryRefs.length) throw new Error(`Broken glossary references: ${brokenGlossaryRefs.join(', ')}`)

const brokenDocumentLinks = visit('docs').filter(file => file.endsWith('.md')).flatMap(file => {
  const source = readFileSync(file, 'utf8')
  return [...source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)]
    .map(match => match[1].trim())
    .filter(target => !/^(?:https?:|mailto:|#|\/)/i.test(target))
    .map(target => target.split(/[?#]/)[0])
    .filter(Boolean)
    .filter(target => !existsSync(resolve(dirname(file), target)))
    .map(target => `${file} -> ${target}`)
})
if (brokenDocumentLinks.length) throw new Error(`Invalid document links: ${brokenDocumentLinks.join(', ')}`)

const coreTechnicalDocs = [
  'docs/csharp-runtime-memory.md',
  'docs/async-threading-concurrency.md',
  'docs/aspnet-pipeline-di.md',
  'docs/api-design-security.md',
  'docs/ef-core-sql.md',
  'docs/distributed-systems.md',
]
const coreWithoutCodeOrFlow = coreTechnicalDocs.filter(file => {
  const source = readFileSync(file, 'utf8')
  return !/```(?:csharp|text|mermaid)[\s\S]*?```/i.test(source)
})
if (coreWithoutCodeOrFlow.length) styleWarnings.push(`core technical docs without code/flow: ${coreWithoutCodeOrFlow.join(', ')}`)

const awkwardInterviewPairs = [
  ['GC', /bộ gom rác/i],
  ['memory dump', /ảnh chụp bộ nhớ/i],
  ['streaming', /đọc dữ liệu từng phần/i],
  ['ArrayPool', /tái sử dụng vùng nhớ/i],
  ['buffer', /vùng nhớ/i],
  ['concurrency limit', /giới hạn song song/i],
  ['concurrency token', /mã phiên bản/i],
  ['execution plan', /kế hoạch chạy/i],
  ['idempotency key', /mã thao tác/i],
  ['source of truth', /nguồn dữ liệu chính/i],
  ['audit trail', /dấu vết kiểm tra/i],
  ['downstream load', /tải từ phía sau/i],
]
const interviewVocabularyWarnings = imports.flatMap(file => {
  const source = readFileSync(file, 'utf8')
  const interviewTail = source.match(/^## (?:Interview Answer|Nói trong phỏng vấn)\s*$([\s\S]*)/m)?.[1] ?? ''
  const interview = interviewTail.split(/^## /m)[0]
  if (!interview) return []
  return awkwardInterviewPairs
    .filter(([preferred, awkward]) => source.toLowerCase().includes(preferred.toLowerCase()) && awkward.test(interview))
    .map(([preferred]) => `${file} (interview answer should keep ${preferred})`)
})
if (interviewVocabularyWarnings.length) styleWarnings.push(`interview vocabulary drift: ${interviewVocabularyWarnings.join(', ')}`)

const titleWarnings = imports.flatMap(file => {
  const title = readFileSync(file, 'utf8').match(/^#\s+(.+)$/m)?.[1]?.trim() ?? ''
  const slogan = /:\s.*\b(?:phải|làm sao|biết cái gì|ưu tiên|để|đi từ)\b/i.test(title)
  return title.length > 72 || slogan ? [`${file} (${title})`] : []
})
if (titleWarnings.length) styleWarnings.push(`titles are long or slogan-like: ${titleWarnings.join(', ')}`)

const headingGroups = new Map()
for (const file of imports) {
  const signature = [...readFileSync(file, 'utf8').matchAll(/^##\s+(.+)$/gm)].map(match => match[1].trim()).join(' | ')
  headingGroups.set(signature, [...(headingGroups.get(signature) ?? []), file])
}
const repeatedTemplates = [...headingGroups.values()].filter(group => group.length > 2)
if (repeatedTemplates.length) styleWarnings.push(`repeated full heading templates: ${repeatedTemplates.map(group => group.join(', ')).join('; ')}`)

const glossaryPattern = new RegExp(`\\b(?:${glossaryTerms.map(item => item.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi')
const denseSentences = imports.flatMap(file => {
  const prose = readFileSync(file, 'utf8').replace(/```[\s\S]*?```/g, '')
  const sentences = prose.split(/\r?\n/)
    .filter(line => !/^\s*(?:\||#)/.test(line))
    .flatMap(line => line.split(/(?<=[.!?])\s+/))
  return sentences.flatMap(sentence => {
    const terms = new Set([...(sentence.match(glossaryPattern) ?? [])].map(term => term.toLowerCase()))
    return terms.size > 5 ? [`${file} (${[...terms].join(', ')})`] : []
  })
})
if (denseSentences.length) styleWarnings.push(`sentences with too many glossary terms: ${denseSentences.join(', ')}`)

const quizSource = readFileSync('src/data/quizzes.ts', 'utf8')
const quizIds = [...quizSource.matchAll(/^\s{4}id: '([^']+)'/gm)].map(match => match[1])
if (quizIds.length < 18) styleWarnings.push('quiz bank has fewer than 18 case-based questions')
const learningObjectiveCount = [...quizSource.matchAll(/\blearningObjective:/g)].length
if (learningObjectiveCount !== quizIds.length) styleWarnings.push('not every quiz has exactly one explicit learning objective')
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
if (missingQuizFields.length) styleWarnings.push(`quiz bank missing recommended fields: ${missingQuizFields.join(', ')}`)

for (const warning of styleWarnings) console.warn(`Editorial warning: ${warning}`)
console.log(`Content validation passed for ${files.length} text files; references, links, directives and IDs are structurally valid.`)
