import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppShell from './components/AppShell'
import HomePage from './pages/HomePage'
import DocPage from './pages/DocPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'docs/:slug', element: <DocPage /> }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
