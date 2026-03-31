import { describe, it, expect, vi, afterEach } from 'vitest';
import { customerSchema } from './customerSchema';

describe('customerSchema', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  const validData = {
    firstName: 'Jan',
    lastName: 'Kowalski',
    dateOfBirth: '1996-03-30',
    city: 'Warszawa',
  };

  it('validates correct data', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30'));
    const result = customerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects empty first name', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30'));
    const result = customerSchema.safeParse({ ...validData, firstName: '' });
    expect(result.success).toBe(false);
  });

  it('rejects empty last name', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30'));
    const result = customerSchema.safeParse({ ...validData, lastName: '' });
    expect(result.success).toBe(false);
  });

  it('rejects empty dateOfBirth', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30'));
    const result = customerSchema.safeParse({ ...validData, dateOfBirth: '' });
    expect(result.success).toBe(false);
  });

  it('rejects person younger than 18', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30'));
    const result = customerSchema.safeParse({ ...validData, dateOfBirth: '2010-01-01' });
    expect(result.success).toBe(false);
  });

  it('rejects person older than 100', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30'));
    const result = customerSchema.safeParse({ ...validData, dateOfBirth: '1920-01-01' });
    expect(result.success).toBe(false);
  });

  it('accepts person exactly 18', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30'));
    const result = customerSchema.safeParse({ ...validData, dateOfBirth: '2008-03-30' });
    expect(result.success).toBe(true);
  });

  it('accepts person exactly 100', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30'));
    const result = customerSchema.safeParse({ ...validData, dateOfBirth: '1926-03-30' });
    expect(result.success).toBe(true);
  });

  it('rejects empty city', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-30'));
    const result = customerSchema.safeParse({ ...validData, city: '' });
    expect(result.success).toBe(false);
  });
});
