import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, leftIcon, rightIcon, id, ...props }, ref) => {
        const inputId = id || Math.random().toString(36).substring(7);

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label htmlFor={inputId} className="text-sm font-semibold text-slate-700">
                        {label}
                    </label>
                )}
                <div className="relative flex items-center group">
                    {leftIcon && (
                        <div className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors">
                            {leftIcon}
                        </div>
                    )}
                    
                    <input
                        ref={ref}
                        id={inputId}
                        className={`w-full bg-slate-50 hover:bg-slate-100 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-sm font-medium text-slate-800 placeholder-slate-400 transition-all ${
                            leftIcon ? 'pl-11' : 'pl-4'
                        } ${rightIcon ? 'pr-11' : 'pr-4'} ${
                            error ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' : ''
                        } ${className}`}
                        style={{ paddingTop: '0.625rem', paddingBottom: '0.625rem' }}
                        {...props}
                    />

                    {rightIcon && (
                        <div className="absolute right-4 text-slate-400 group-focus-within:text-primary transition-colors">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <span className="text-xs font-medium text-rose-500 tracking-wide">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';