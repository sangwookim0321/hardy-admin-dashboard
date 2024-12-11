'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import MobileHeader from '@/components/molecules/sidebar-items/MobileHeader'
import UserProfile from '@/components/molecules/sidebar-items/UserProfile'
import ProjectMenuItem from '@/components/molecules/sidebar-items/ProjectMenuItem'
import BottomMenuItem from '@/components/molecules/sidebar-items/BottomMenuItem'
import { projectMenus, bottomMenus } from './config'
import { MdLogout } from 'react-icons/md'
import { useAuth } from '@/hooks/useAuth'

export default function MobileSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const { logout } = useAuth()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    logout()
  }

  const toggleMenu = (href: string) => {
    setOpenMenus((prev) => (prev.includes(href) ? prev.filter((menu) => menu !== href) : [...prev, href]))
  }

  return (
    <>
      <MobileHeader isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />

      <div
        className={`
          fixed left-0 right-0 bg-white transition-all duration-300 ease-in-out overflow-hidden origin-top z-50
          ${
            isOpen
              ? 'top-[60px] bottom-0 opacity-100 pointer-events-auto visible scale-y-100'
              : 'top-[60px] bottom-0 opacity-0 pointer-events-none invisible scale-y-0'
          }
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
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
                    onSubMenuClick={() => setIsOpen(false)}
                    currentPath={pathname}
                  />
                ))}
              </div>
            </nav>
          </div>

          <div className="border-t p-4 bg-white">
            <div className="space-y-2">
              {bottomMenus.map((menu) => (
                <BottomMenuItem
                  key={menu.href}
                  {...menu}
                  isActive={pathname === menu.href}
                  onClick={() => setIsOpen(false)}
                />
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
        </div>
      </div>
    </>
  )
}
