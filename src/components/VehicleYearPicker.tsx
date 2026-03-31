import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface VehicleYearPickerProps {
  value: number | undefined;
  onChange: (value: number) => void;
  label: string;
  error?: string;
  placeholder?: string;
}

export function VehicleYearPicker({ value, onChange, label, error, placeholder }: VehicleYearPickerProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const minYear = 1900;

  const [selectedYear, setSelectedYear] = useState(value || currentYear);

  function handleOpen() {
    if (value) setSelectedYear(value);
    setIsOpen(true);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  function handleConfirm() {
    onChange(selectedYear);
    setIsOpen(false);
  }

  function handleCancel() {
    setIsOpen(false);
  }

  const years = [];
  for (let y = currentYear; y >= minYear; y--) {
    years.push(y);
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-[#575756]">{label}</label>
      <button
        type="button"
        onClick={handleOpen}
        className={`rounded-md border px-3 py-2 text-sm text-left outline-none transition-colors
          ${error ? 'border-[#BF1528] bg-red-50' : 'border-gray-300 bg-white hover:border-[#BF1528]'}
          ${!value ? 'text-gray-400' : 'text-gray-900'}`}
      >
        {value || placeholder}
      </button>
      {error && <span className="text-xs text-[#BF1528]">{error}</span>}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div ref={modalRef} className="bg-white rounded-xl shadow-lg p-6 w-72">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{label}</h3>
            <div className="mb-6">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#BF1528]"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary px-4 py-2 text-sm"
              >
                {t('button.cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="btn-primary px-4 py-2 text-sm"
              >
                {t('button.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
