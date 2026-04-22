'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { deleteSchedule } from '@/lib/queries/schedules'

export function DeleteButton({ scheduleId }: { scheduleId: string }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)

  const handleDelete = async () => {
    if (!confirming) {
      setConfirming(true)
      setTimeout(() => setConfirming(false), 3000)
      return
    }
    await deleteSchedule(scheduleId)
    router.push('/today')
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
        confirming
          ? 'bg-red-500 text-white'
          : 'text-red-400 hover:bg-red-50'
      }`}
    >
      {confirming ? '정말 삭제?' : <Trash2 className="h-5 w-5" />}
    </button>
  )
}
