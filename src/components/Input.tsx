import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-sm font-medium text-[#575756]">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={`rounded-md border px-3 py-2 text-sm outline-none transition-colors
            ${error ? 'border-[#BF1528] bg-red-50' : 'border-gray-300 bg-white focus:border-[#BF1528]'}`}
          {...props}
        />
        {error && <span className="text-xs text-[#BF1528]">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
