import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary';
    children: React.ReactNode;
}

export function Badge({ variant = 'primary', children, className = '', ...props }: BadgeProps) {
    const variants = {
        success: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        warning: 'bg-amber-50 text-amber-600 border-amber-200',
        danger: 'bg-rose-50 text-rose-600 border-rose-200',
        info: 'bg-blue-50 text-blue-600 border-blue-200',
        primary: 'bg-primary/10 text-primary border-primary/20',
        secondary: 'bg-secondary/20 text-slate-800 border-secondary/40',
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}