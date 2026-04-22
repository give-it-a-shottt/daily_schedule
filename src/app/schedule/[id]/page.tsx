import { ChevronLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ScheduleForm } from '@/components/schedule/ScheduleForm'
import { DeleteButton } from './DeleteButton'
import { createClient } from '@/lib/supabase/client'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditSchedulePage({ params }: Props) {
  const { id } = await params

  const supabase = createClient()
  const { data: schedule } = await supabase
    .from('schedules')
    .select('*')
    .eq('id', id)
    .eq('is_deleted', false)
    .single()

  if (!schedule) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/today" className="rounded-full p-1 text-gray-600">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">일정 수정</h1>
        </div>
        <DeleteButton scheduleId={id} />
      </div>
      <div className="px-4 py-6">
        <ScheduleForm schedule={schedule} />
      </div>
    </div>
  )
}
