import { InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className="h-4 w-4 rounded border-gray-300 accent-[#BF1528]"
          {...props}
        />
        <label htmlFor={id} className="text-sm text-[#575756]">
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
