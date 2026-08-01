import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppShell from './components/AppShell'
import HomePage from './pages/HomePage'
import DocPage from './pages/DocPage'
import InterviewPage from './pages/InterviewPage'
import ReviewPage from './pages/ReviewPage'
import NotFoundPage from './pages/NotFoundPage'
import GlossaryPage from './pages/GlossaryPage'
import QuizHubPage from './pages/QuizHubPage'
import QuizPage from './pages/QuizPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'docs/:slug', element: <DocPage /> },
      { path: 'interview', element: <InterviewPage /> },
      { path: 'quiz', element: <QuizHubPage /> },
      { path: 'quiz/play', element: <QuizPage /> },
      { path: 'review', element: <ReviewPage /> },
      { path: 'glossary', element: <GlossaryPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
