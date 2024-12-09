'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { MdLogout } from 'react-icons/md'
import Logo from '@/components/atoms/logo/Logo'
import UserProfile from '@/components/molecules/sidebar-items/UserProfile'
import ProjectMenuItem from '@/components/molecules/sidebar-items/ProjectMenuItem'
import BottomMenuItem from '@/components/molecules/sidebar-items/BottomMenuItem'
import { projectMenus, bottomMenus } from './config'
import { useAuth } from '@/hooks/useAuth'

export default function DesktopSidebar() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const toggleMenu = (href: string) => {
    setOpenMenus((prev) => (prev.includes(href) ? prev.filter((menu) => menu !== href) : [...prev, href]))
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-white border-r">
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-center p-6">
          <Logo width={80} height={80} />
        </div>
        <UserProfile />

        <nav className="p-4">
          <div className="space-y-2">
            {projectMenus.map((menu) => (
              <ProjectMenuItem
                key={menu.href}
                {...menu}
                isOpen={openMenus.includes(menu.href)}
                isActive={pathname === menu.href}
                onToggle={() => toggleMenu(menu.href)}
                currentPath={pathname}
              />
            ))}
          </div>
        </nav>
      </div>

      <div className="border-t p-4">
        <div className="space-y-2">
          {bottomMenus.map((menu) => (
            <BottomMenuItem key={menu.href} {...menu} isActive={pathname === menu.href} />
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 w-full"
          >
            <MdLogout className="h-5 w-5" />
            <span>로그아웃</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
