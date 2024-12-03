import { HTMLAttributes } from 'react';

interface FlexBoxProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  items?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: number;
}

export const FlexBox = ({
  children,
  direction = 'row',
  justify = 'start',
  items = 'start',
  gap = 0,
  className = '',
  ...props
}: FlexBoxProps) => {
  const baseStyles = 'flex';
  const directionStyles = {
    row: 'flex-row',
    col: 'flex-col',
  };
  const justifyStyles = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };
  const itemsStyles = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${directionStyles[direction]}
        ${justifyStyles[justify]}
        ${itemsStyles[items]}
        ${gap ? `gap-${gap}` : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
