import { describe, it, expect, vi, afterEach } from 'vitest';
import { calculateAge, formatDateOfBirth } from './dateUtils';

describe('calculateAge', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('calculates age for someone born 30 years ago', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30'));
    expect(calculateAge('1996-03-30')).toBe(30);
  });

  it('returns age minus 1 if birthday has not occurred yet this year', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30'));
    expect(calculateAge('1996-06-15')).toBe(29);
  });

  it('returns correct age if birthday was earlier this year', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30'));
    expect(calculateAge('1996-01-10')).toBe(30);
  });

  it('handles leap year birthday', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-01'));
    expect(calculateAge('2000-02-29')).toBe(26);
  });

  it('returns 18 for someone exactly 18', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30'));
    expect(calculateAge('2008-03-30')).toBe(18);
  });

  it('returns 0 for a date today (edge case)', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30'));
    expect(calculateAge('2026-03-30')).toBe(0);
  });
});

describe('formatDateOfBirth', () => {
  it('formats for PL locale (DD.MM.YYYY)', () => {
    expect(formatDateOfBirth('1996-03-30', 'pl')).toBe('30.03.1996');
  });

  it('formats for EN locale (MM/DD/YYYY)', () => {
    expect(formatDateOfBirth('1996-03-30', 'en')).toBe('03/30/1996');
  });

  it('returns empty string for empty input', () => {
    expect(formatDateOfBirth('', 'en')).toBe('');
  });
});
