import { useState, useRef, useEffect } from 'react';
import { filterCities } from '../data/locations';
import type { CountryCode } from '../data/locations';

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  country: CountryCode;
  province: string;
  label: string;
  placeholder?: string;
  error?: string;
}

export function CityAutocomplete({
  value,
  onChange,
  country,
  province,
  label,
  placeholder,
  error,
}: CityAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    if (province && isOpen) {
      setSuggestions(filterCities(country, province, query));
    } else {
      setSuggestions([]);
    }
  }, [query, country, province, isOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    onChange(val);
    setIsOpen(true);
  }

  function handleSelect(city: string) {
    setQuery(city);
    onChange(city);
    setIsOpen(false);
  }

  return (
    <div ref={wrapperRef} className="flex flex-col gap-1 relative">
      <label className="text-sm font-medium text-[#575756]">{label}</label>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className={`rounded-md border px-3 py-2 text-sm outline-none transition-colors
          ${error ? 'border-[#BF1528] bg-red-50' : 'border-gray-300 bg-white focus:border-[#BF1528]'}`}
      />
      {error && <span className="text-xs text-[#BF1528]">{error}</span>}
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-md z-10">
          {suggestions.map((city) => (
            <li
              key={city}
              onClick={() => handleSelect(city)}
              className="cursor-pointer px-3 py-2 text-sm hover:bg-[#BF1528]/10 hover:text-[#BF1528] transition-colors"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
