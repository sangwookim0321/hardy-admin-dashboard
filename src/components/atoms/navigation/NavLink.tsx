import Link from 'next/link';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

export default function NavLink({
  href,
  isActive = false,
  onClick,
  className = '',
  children,
}: NavLinkProps) {
  const baseClasses = 'flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm';
  const activeClasses = isActive
    ? 'text-colorSky font-bold'
    : 'text-gray-700 hover:bg-gray-100';

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${activeClasses} ${className}`}
    >
      {children}
    </Link>
  );
}
