'use client'

import { HiMenu, HiX } from 'react-icons/hi'
import Logo from '@/components/atoms/logo/Logo'
import IconButton from '@/components/atoms/icon-button/IconButton'

interface MobileHeaderProps {
  isOpen: boolean
  onToggle: () => void
}

export default function MobileHeader({ isOpen, onToggle }: MobileHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Logo />
        <IconButton
          onClick={onToggle}
          aria-label="Toggle menu"
          icon={isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
        />
      </div>
    </header>
  )
}
