import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { label: string; value: string | number }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = '', label, error, options, id, ...props }, ref) => {
        const selectId = id || Math.random().toString(36).substring(7);

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label htmlFor={selectId} className="text-sm font-semibold text-slate-700">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        id={selectId}
                        className={`w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-sm font-medium text-slate-800 transition-all px-4 py-2.5 pr-10 cursor-pointer ${error ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' : ''
                            } ${className}`}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronDown size={16} strokeWidth={2.5} />
                    </div>
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

Select.displayName = 'Select';