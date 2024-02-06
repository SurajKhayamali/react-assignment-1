import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

const sizes = {
  lg: 'btn-lg',
  md: 'btn-md',
  sm: 'btn-sm',
  xl: 'btn-xl',
};

const variants = {
  primary: 'btn-primary',
  outline: 'btn-outline',
};

export type ButtonProps = {
  title: string;
  onClick?: () => void;
  className?: string;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  title,
  onClick,
  className = '',
  size = 'md',
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx('btn', sizes[size], variants[variant], className)}
      onClick={onClick}
      {...rest}
    >
      {title}
    </button>
  );
};

export default Button;
