import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { ScheduleForm } from '@/components/schedule/ScheduleForm'

export default function NewSchedulePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-4">
        <Link href="/today" className="rounded-full p-1 text-gray-600">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">새 일정</h1>
      </div>
      <div className="px-4 py-6">
        <ScheduleForm />
      </div>
    </div>
  )
}
