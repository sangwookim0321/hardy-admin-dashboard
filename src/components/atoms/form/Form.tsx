import { FormHTMLAttributes, forwardRef } from 'react'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  spacing?: number
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, className = '', spacing = 6, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={`
        ${spacing ? `space-y-${spacing}` : ''}
        ${className}
      `}
        {...props}
      >
        {children}
      </form>
    )
  }
)

Form.displayName = 'Form'
