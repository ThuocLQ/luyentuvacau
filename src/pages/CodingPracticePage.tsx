import { Code2, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CodingPracticePage() {
  return <div className="home-page interview-page">
    <section className="home-hero"><div className="hero-copy"><div className="eyebrow">Coming soon</div><h1>Coding Practice</h1><p>Coding, debugging và SQL practical rounds sẽ được bổ sung ở một phase riêng, với đề bài, rubric và test runner thật — không tạo editor giả chỉ để có UI.</p></div></section>
    <section className="study-tip"><Code2 size={20} /><div><p><strong>Trong lúc chờ:</strong> dùng Quiz tình huống để luyện quyết định, Oral Interview để luyện diễn đạt, và Testing/Async/SQL cheatsheet để tự code theo scenario thật trong IDE của bạn.</p><div className="hero-actions"><Link className="primary-button" to="/quiz">Làm quiz</Link><Link className="secondary-button" to="/interview"><Clock3 size={17} /> Luyện 60 giây</Link></div></div></section>
  </div>
}
