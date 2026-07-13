'use client'

import { clsx } from 'clsx'
import { LayoutDashboard, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { ADMIN_NAV } from '@/lib/cms/navigation'
import { LOGO_ALT, LOGO_PATH } from '@/lib/brand'
import ExportCmsButton from '@/components/admin/ExportCmsButton'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-[#1a1f36] text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src={LOGO_PATH}
            alt={LOGO_ALT}
            width={140}
            height={36}
            className="h-8 w-auto brightness-0 invert"
          />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {ADMIN_NAV.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.15em] text-white/40">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors',
                      isActive(item.href)
                        ? 'bg-white/10 font-medium text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    {item.href === '/admin' && (
                      <LayoutDashboard className="h-4 w-4 shrink-0" aria-hidden />
                    )}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 rounded-lg bg-white/5 px-3 py-2.5">
          <p className="text-sm font-medium">admin</p>
          <p className="text-xs text-white/50">Administrator</p>
        </div>
        <ExportCmsButton variant="sidebar" className="mb-2" />
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
