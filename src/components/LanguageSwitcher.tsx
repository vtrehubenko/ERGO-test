import { useTranslation } from '../hooks/useTranslation';

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button
        onClick={() => setLanguage('pl')}
        className={`px-2 py-1 transition-colors ${
          language === 'pl' ? 'text-[#BF1528] font-bold' : 'text-[#575756] hover:text-[#BF1528]'
        }`}
      >
        PL
      </button>
      <span className="text-[#575756]">|</span>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 transition-colors ${
          language === 'en' ? 'text-[#BF1528] font-bold' : 'text-[#575756] hover:text-[#BF1528]'
        }`}
      >
        EN
      </button>
    </div>
  );
}
