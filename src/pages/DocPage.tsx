import { Navigate, useParams } from 'react-router-dom'
import MarkdownDocument from '../components/MarkdownDocument'
import { findCompleteDoc } from '../data/docs'

export default function DocPage() {
  const { slug } = useParams()
  const doc = findCompleteDoc(slug)

  if (!doc?.content) return <Navigate to="/" replace />
  return <MarkdownDocument doc={{ ...doc, content: doc.content }} />
}
