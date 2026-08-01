import { ArrowRight, BookOpenCheck, CircleHelp, RotateCcw } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import { quizQuestions } from '../data/quizzes'
import { useQuizProgress } from '../hooks/useQuizProgress'

export default function QuizHubPage() {
  const [searchParams] = useSearchParams()
  const { dueQuestionIds } = useQuizProgress()
  const selectedTopic = searchParams.get('topic') ?? 'Tất cả'
  const topics = useMemo(() => [...new Set(quizQuestions.map(question => question.topic))], [])
  const selectedQuestions = selectedTopic === 'Tất cả'
    ? quizQuestions
    : quizQuestions.filter(question => question.topic === selectedTopic)

  return <div className="home-page quiz-hub-page">
    <section className="home-hero">
      <div className="hero-copy">
        <div className="eyebrow">Quiz kiểm tra quyết định</div>
        <h1>Chọn phương án.<br />Hiểu vì sao.</h1>
        <p>Mỗi câu dùng một tình huống backend thật để kiểm tra cách bạn xử lý rủi ro, trade-off và failure mode — không kiểm tra việc nhớ API.</p>
      </div>
    </section>

    <section className="quiz-hub-controls" aria-labelledby="quiz-topic-heading">
      <div>
        <span className="mini-label">Chọn phạm vi</span>
        <h2 id="quiz-topic-heading">Ôn theo chủ đề</h2>
      </div>
      <div className="quiz-topic-list" aria-label="Chủ đề quiz">
        <Link className={selectedTopic === 'Tất cả' ? 'category-filter active' : 'category-filter'} to="/quiz">Tất cả</Link>
        {topics.map(topic => <Link key={topic} className={selectedTopic === topic ? 'category-filter active' : 'category-filter'} to={`/quiz?topic=${encodeURIComponent(topic)}`}>{topic}</Link>)}
      </div>
      <p className="quiz-hub-description">Phiên theo chủ đề sẽ lấy tối đa năm câu khác nhau. Chọn đáp án tốt nhất trong bối cảnh đã nêu, rồi đọc lý do trước khi qua câu mới.</p>
      <Link className="primary-button" to={`/quiz/play?topic=${encodeURIComponent(selectedTopic)}`} aria-disabled={selectedQuestions.length === 0}>
        <CircleHelp size={17} /> Bắt đầu theo chủ đề <ArrowRight size={17} />
      </Link>
    </section>

    <section className="quiz-review-card" aria-labelledby="quiz-review-heading">
      <div>
        <span className="mini-label">Ôn phần chưa chắc</span>
        <h2 id="quiz-review-heading">Quay lại câu đã sai hoặc còn lưỡng lự</h2>
        <p>{dueQuestionIds.length ? 'Chỉ lấy những câu bạn cần xem lại; làm đúng nhưng còn lưỡng lự vẫn được giữ lại.' : 'Chưa có câu cần ôn. Sau mỗi câu, hãy tự đánh giá mức chắc chắn để tạo lượt ôn phù hợp.'}</p>
      </div>
      {dueQuestionIds.length
        ? <Link className="secondary-button" to="/quiz/play?mode=due"><RotateCcw size={17} /> Ôn lại</Link>
        : <Link className="secondary-button" to="/interview"><BookOpenCheck size={17} /> Luyện trả lời miệng</Link>}
    </section>
  </div>
}
