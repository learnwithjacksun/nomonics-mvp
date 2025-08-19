import { MainLayout } from '@/layouts'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <MainLayout>
        <div className="flex flex-col items-center justify-center h-[400px]">
            <h1 className="text-6xl font-bold text-primary-2">404</h1>
            <p className="text-lg">The page you are looking for does not exist.</p>
            <Link to="/overview" className="text-primary-2 underline">Go back to home</Link>
        </div>
    </MainLayout>
  )
}
