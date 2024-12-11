import { IconType } from 'react-icons';
import NavLink from '@/components/atoms/navigation/NavLink';

interface BottomMenuItemProps {
  label: string;
  href: string;
  icon: IconType;
  isActive: boolean;
  onClick?: () => void;
}

export default function BottomMenuItem({
  label,
  href,
  icon: Icon,
  isActive,
  onClick,
}: BottomMenuItemProps) {
  return (
    <NavLink href={href} isActive={isActive} onClick={onClick}>
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </NavLink>
  );
}
