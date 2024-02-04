import clsx from 'clsx';

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
  onClick: () => void;
  className?: string;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
};

const Button = ({
  title,
  onClick,
  className = '',
  size = 'md',
  variant = 'primary',
}: ButtonProps) => {
  return (
    <button
      className={clsx('btn', sizes[size], variants[variant], className)}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
