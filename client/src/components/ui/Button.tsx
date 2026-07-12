import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className = '',
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

        const variants = {
            primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm shadow-primary/20 focus:ring-primary/20',
            secondary: 'bg-secondary text-slate-900 hover:bg-secondary/90 shadow-sm shadow-secondary/20 focus:ring-secondary/20',
            outline: 'border-2 border-primary text-primary hover:bg-primary/5 focus:ring-primary/10',
            ghost: 'text-slate-600 hover:bg-slate-100 hover:text-primary focus:ring-slate-100',
            danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm shadow-rose-500/20 focus:ring-rose-500/20',
        };

        const sizes = {
            sm: 'text-xs px-3 py-1.5 gap-1.5',
            md: 'text-sm px-5 py-2.5 gap-2',
            lg: 'text-base px-6 py-3 gap-2.5',
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                {...props}
            >
                {isLoading && <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 18} />}
                {!isLoading && leftIcon}
                {children}
                {!isLoading && rightIcon}
            </button>
        );
    }
);

Button.displayName = 'Button';