import { describe, it, expect } from 'vitest';
import { insuranceSchema } from './insuranceSchema';

describe('insuranceSchema', () => {
  it('validates correct Car data with vehicleYear', () => {
    const result = insuranceSchema.safeParse({
      type: 'Car',
      coverage: 5000,
      additionalOptions: false,
      vehicleYear: 2020,
    });
    expect(result.success).toBe(true);
  });

  it('validates correct Home data without vehicleYear', () => {
    const result = insuranceSchema.safeParse({
      type: 'Home',
      coverage: 10000,
      additionalOptions: true,
    });
    expect(result.success).toBe(true);
  });

  it('validates correct Travel data without vehicleYear', () => {
    const result = insuranceSchema.safeParse({
      type: 'Travel',
      coverage: 1000,
      additionalOptions: false,
    });
    expect(result.success).toBe(true);
  });

  it('rejects Car without vehicleYear', () => {
    const result = insuranceSchema.safeParse({
      type: 'Car',
      coverage: 5000,
      additionalOptions: false,
    });
    expect(result.success).toBe(false);
  });

  it('rejects coverage below 1000', () => {
    const result = insuranceSchema.safeParse({
      type: 'Home',
      coverage: 999,
      additionalOptions: false,
    });
    expect(result.success).toBe(false);
  });

  it('accepts coverage at exactly 1000', () => {
    const result = insuranceSchema.safeParse({
      type: 'Travel',
      coverage: 1000,
      additionalOptions: false,
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid insurance type', () => {
    const result = insuranceSchema.safeParse({
      type: 'Life',
      coverage: 5000,
      additionalOptions: false,
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing type', () => {
    const result = insuranceSchema.safeParse({
      coverage: 5000,
      additionalOptions: false,
    });
    expect(result.success).toBe(false);
  });
});
