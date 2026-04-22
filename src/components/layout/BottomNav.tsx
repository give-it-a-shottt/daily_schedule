'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, CalendarDays, Calendar, Plus } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const tabs = [
  { href: '/today', icon: Home, label: '오늘' },
  { href: '/weekly', icon: CalendarDays, label: '주간' },
  { href: '/monthly', icon: Calendar, label: '월간' },
] as const

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white pb-safe">
      <div className="flex h-16 items-center justify-around px-2">
        {tabs.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-1 flex-col items-center justify-center gap-1 py-2"
            >
              <Icon
                className={cn(
                  'h-6 w-6 transition-colors',
                  active ? 'text-indigo-600' : 'text-gray-400'
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  active ? 'text-indigo-600' : 'text-gray-400'
                )}
              >
                {label}
              </span>
            </Link>
          )
        })}

        <Link
          href="/schedule/new"
          className="flex flex-1 flex-col items-center justify-center gap-1 py-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 shadow-md shadow-indigo-200">
            <Plus className="h-5 w-5 text-white" />
          </div>
        </Link>
      </div>
    </nav>
  )
}
