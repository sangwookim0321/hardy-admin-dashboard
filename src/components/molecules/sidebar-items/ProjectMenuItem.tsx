import { HiChevronDown } from 'react-icons/hi'
import NavLink from '@/components/atoms/navigation/NavLink'

interface SubMenu {
  label: string
  href: string
}

interface ProjectMenuItemProps {
  label: string
  href: string
  children?: SubMenu[]
  isOpen: boolean
  isActive: boolean
  onToggle: () => void
  onSubMenuClick?: () => void
  currentPath: string
}

export default function ProjectMenuItem({
  label,
  href,
  children,
  isOpen,
  isActive,
  onToggle,
  onSubMenuClick,
  currentPath,
}: ProjectMenuItemProps) {
  return (
    <div>
      {children ? (
        <div
          onClick={onToggle}
          className={`
            flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm cursor-pointer
            ${isActive ? 'text-colorSky font-bold' : 'text-gray-700 hover:bg-gray-100'}
          `}
        >
          <HiChevronDown
            className={`h-4 w-4 transition-transform duration-200 ease-in-out
              ${isOpen ? 'rotate-180' : ''}
            `}
          />
          <span>{label}</span>
        </div>
      ) : (
        <NavLink href={href} isActive={isActive} onClick={onSubMenuClick}>
          <span>{label}</span>
        </NavLink>
      )}

      {children && (
        <div
          className={`
            ml-7 space-y-1 overflow-hidden transition-all duration-200 ease-in-out
            ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          {children.map((child) => (
            <NavLink
              key={child.href}
              href={child.href}
              isActive={currentPath === child.href}
              onClick={onSubMenuClick}
              className={currentPath === child.href ? 'text-colorSky font-bold' : 'text-gray-600'}
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}
