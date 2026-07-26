import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppShell from './components/AppShell'
import HomePage from './pages/HomePage'
import DocPage from './pages/DocPage'
import InterviewPage from './pages/InterviewPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'docs/:slug', element: <DocPage /> },
      { path: 'interview', element: <InterviewPage /> }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
