import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export default function IconButton({
  icon,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const variantClasses = {
    primary: 'hover:bg-gray-100 rounded-lg',
    secondary: 'hover:bg-gray-200 rounded-lg',
  };

  return (
    <button
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon || children}
    </button>
  );
}
