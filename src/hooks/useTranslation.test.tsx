import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import { useTranslation } from './useTranslation';

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

describe('useTranslation', () => {
  it('returns English translations by default (non-PL browser)', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.t('button.next')).toBe('Next');
  });

  it('switches to Polish translations', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });
    act(() => {
      result.current.setLanguage('pl');
    });
    expect(result.current.t('button.next')).toBe('Dalej');
  });

  it('returns the key itself for missing translations', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.t('nonexistent.key')).toBe('nonexistent.key');
  });

  it('throws when used outside provider', () => {
    expect(() => {
      renderHook(() => useTranslation());
    }).toThrow('useTranslation must be used within a LanguageProvider');
  });
});
