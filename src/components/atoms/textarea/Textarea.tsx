import { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export const Textarea = ({ error, className = '', ...props }: TextareaProps) => {
  return (
    <div className="relative w-full">
      <textarea
        className={`
          w-full rounded-lg border border-gray-300 px-4 py-2 min-h-[120px]
          focus:border-blue-500 focus:outline-none
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
