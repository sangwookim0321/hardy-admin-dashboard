import { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  error?: string
}

export const Input = ({ icon, error, className = '', ...props }: InputProps) => {
  return (
    <div className="relative w-full">
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">{icon}</div>}
        <input
          className={`
            w-full rounded-lg border border-gray-300 px-4 py-2 
            focus:border-blue-500 focus:outline-none
            ${icon ? 'pl-10' : ''} 
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
