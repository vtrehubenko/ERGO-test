import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-sm font-medium text-[#575756]">
          {label}
        </label>
        <select
          ref={ref}
          id={id}
          className={`rounded-md border px-3 py-2 text-sm outline-none transition-colors
            ${error ? 'border-[#BF1528] bg-red-50' : 'border-gray-300 bg-white focus:border-[#BF1528]'}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-[#BF1528]">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
