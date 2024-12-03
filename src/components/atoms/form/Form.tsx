import { FormHTMLAttributes } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  spacing?: number;
}

export const Form = ({
  children,
  className = '',
  spacing = 6,
  ...props
}: FormProps) => {
  return (
    <form
      className={`
        ${spacing ? `space-y-${spacing}` : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </form>
  );
};
