import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    default: 'bg-[#1e2a47] text-white hover:bg-[#2d3e6a]',
    ghost: 'hover:bg-transparent',
    outline: 'border border-gray-200 bg-white hover:bg-gray-50',
  };
  const sizes = {
    icon: 'h-10 w-10',
    default: 'h-10 px-4 py-2',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
};
