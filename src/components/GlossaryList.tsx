import { Link } from 'react-router-dom'
import type { GlossaryTerm } from '../types/content'

export default function GlossaryList({ terms }: { terms: GlossaryTerm[] }) {
  return <div className="glossary-list">{terms.map(term => <article key={term.id} className="glossary-item"><h2>{term.term}</h2><p>{term.shortDefinition}</p>{term.explanation && <p className="glossary-detail">{term.explanation}</p>}{term.relatedDocs?.length ? <div>{term.relatedDocs.map(doc => <Link key={doc} to={`/docs/${doc}`}>Xem trong cheatsheet</Link>)}</div> : null}</article>)}</div>
}
