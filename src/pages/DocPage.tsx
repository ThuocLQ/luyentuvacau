import { Navigate, useParams } from 'react-router-dom'
import MarkdownDocument from '../components/MarkdownDocument'
import { findDoc } from '../data/docs'

export default function DocPage() {
  const { slug } = useParams()
  const doc = findDoc(slug)

  if (!doc) return <Navigate to="/" replace />
  return <MarkdownDocument doc={doc} />
}
