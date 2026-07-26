import { ArrowLeft, SearchX } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return <div className="home-page"><section className="home-hero"><div className="hero-copy"><div className="eyebrow">Không tìm thấy nội dung</div><h1>Đường dẫn này<br />không còn hợp lệ.</h1><p>Cheatsheet có thể chưa được xuất bản hoặc URL đã bị nhập sai.</p><Link className="primary-button" to="/"><ArrowLeft size={17} /> Về Interview Map</Link></div><SearchX size={80} /></section></div>
}
