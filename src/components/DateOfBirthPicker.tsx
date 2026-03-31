import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { formatDateOfBirth } from '../utils/dateUtils';
import type { Language } from '../context/LanguageContext';

interface DateOfBirthPickerProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  error?: string;
  placeholder?: string;
}

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

export function DateOfBirthPicker({ value, onChange, label, error, placeholder }: DateOfBirthPickerProps) {
  const { t, language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const maxYear = currentYear - 18;

  const parsed = value ? value.split('-').map(Number) : [0, 0, 0];
  const [selectedYear, setSelectedYear] = useState(parsed[0] || maxYear);
  const [selectedMonth, setSelectedMonth] = useState(parsed[1] || 1);
  const [selectedDay, setSelectedDay] = useState(parsed[2] || 1);

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const clampedDay = selectedDay > daysInMonth ? daysInMonth : selectedDay;

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
    const y = String(selectedYear);
    const m = String(selectedMonth).padStart(2, '0');
    const d = String(clampedDay).padStart(2, '0');
    onChange(`${y}-${m}-${d}`);
    setIsOpen(false);
  }

  function handleCancel() {
    setIsOpen(false);
  }

  const years = [];
  for (let y = maxYear; y >= minYear; y--) {
    years.push(y);
  }

  const months = [];
  for (let m = 1; m <= 12; m++) {
    months.push(m);
  }

  const days = [];
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-[#575756]">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`rounded-md border px-3 py-2 text-sm text-left outline-none transition-colors
          ${error ? 'border-[#BF1528] bg-red-50' : 'border-gray-300 bg-white hover:border-[#BF1528]'}
          ${!value ? 'text-gray-400' : 'text-gray-900'}`}
      >
        {value ? formatDateOfBirth(value, language as Language) : placeholder}
      </button>
      {error && <span className="text-xs text-[#BF1528]">{error}</span>}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div ref={modalRef} className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{label}</h3>
            <div className="flex gap-2 mb-6">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs text-[#575756]">{t('month.' + selectedMonth).slice(0, 3)}</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="rounded-md border border-gray-300 px-2 py-2 text-sm outline-none focus:border-[#BF1528]"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{t(`month.${m}`)}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1 w-20">
                <label className="text-xs text-[#575756]">Day</label>
                <select
                  value={clampedDay}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                  className="rounded-md border border-gray-300 px-2 py-2 text-sm outline-none focus:border-[#BF1528]"
                >
                  {days.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1 w-24">
                <label className="text-xs text-[#575756]">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="rounded-md border border-gray-300 px-2 py-2 text-sm outline-none focus:border-[#BF1528]"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
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
