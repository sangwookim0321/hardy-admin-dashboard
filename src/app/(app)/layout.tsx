'use client'

import Sidebar from '@/components/organisms/sidebar/Sidebar'
import { usePathname } from 'next/navigation'
import { PageTitle } from '@/components/atoms/page-title/PageTitle'
import { getPageTitle } from '@/components/atoms/page-title/config'

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title = getPageTitle(pathname)

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="overflow-x-auto flex-1 p-8 lg:p-8 mt-[60px] lg:mt-0 ml-0 lg:ml-64">
        {title && <PageTitle title={title} />}
        {children}
      </main>
    </div>
  )
}
