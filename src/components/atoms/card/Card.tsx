import { HTMLAttributes, ReactNode, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-lg border border-gray-200 bg-white shadow-sm
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)
