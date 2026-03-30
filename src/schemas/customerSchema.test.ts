import { describe, it, expect } from 'vitest';
import { customerSchema } from './customerSchema';

describe('customerSchema', () => {
  it('validates correct data', () => {
    const result = customerSchema.safeParse({
      firstName: 'Jan',
      lastName: 'Kowalski',
      age: 30,
      city: 'Warszawa',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty first name', () => {
    const result = customerSchema.safeParse({
      firstName: '',
      lastName: 'Kowalski',
      age: 30,
      city: 'Warszawa',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty last name', () => {
    const result = customerSchema.safeParse({
      firstName: 'Jan',
      lastName: '',
      age: 30,
      city: 'Warszawa',
    });
    expect(result.success).toBe(false);
  });

  it('rejects age below 18', () => {
    const result = customerSchema.safeParse({
      firstName: 'Jan',
      lastName: 'Kowalski',
      age: 17,
      city: 'Warszawa',
    });
    expect(result.success).toBe(false);
  });

  it('rejects age above 100', () => {
    const result = customerSchema.safeParse({
      firstName: 'Jan',
      lastName: 'Kowalski',
      age: 101,
      city: 'Warszawa',
    });
    expect(result.success).toBe(false);
  });

  it('accepts age at boundaries (18 and 100)', () => {
    expect(customerSchema.safeParse({
      firstName: 'Jan', lastName: 'K', age: 18, city: 'X',
    }).success).toBe(true);

    expect(customerSchema.safeParse({
      firstName: 'Jan', lastName: 'K', age: 100, city: 'X',
    }).success).toBe(true);
  });

  it('rejects empty city', () => {
    const result = customerSchema.safeParse({
      firstName: 'Jan',
      lastName: 'Kowalski',
      age: 30,
      city: '',
    });
    expect(result.success).toBe(false);
  });

  it('rejects non-numeric age', () => {
    const result = customerSchema.safeParse({
      firstName: 'Jan',
      lastName: 'Kowalski',
      age: 'thirty',
      city: 'Warszawa',
    });
    expect(result.success).toBe(false);
  });
});
