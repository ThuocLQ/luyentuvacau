import { useParams } from 'react-router-dom'
import MarkdownDocument from '../components/MarkdownDocument'
import { findCompleteDoc } from '../data/docs'
import NotFoundPage from './NotFoundPage'

export default function DocPage() {
  const { slug } = useParams()
  const doc = findCompleteDoc(slug)

  if (!doc?.content) return <NotFoundPage />
  return <MarkdownDocument doc={{ ...doc, content: doc.content }} />
}
