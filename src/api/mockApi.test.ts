import { describe, it, expect, vi } from 'vitest';
import { submitOffer } from './mockApi';
import type { CustomerData, InsuranceData } from '../types/wizard';

const mockCustomer: CustomerData = {
  firstName: 'Jan',
  lastName: 'Kowalski',
  age: 30,
  city: 'Warszawa',
};

const mockInsurance: InsuranceData = {
  type: 'Home',
  coverage: 10000,
  additionalOptions: false,
};

describe('submitOffer', () => {
  it('resolves with an offerId on success', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const result = await submitOffer(mockCustomer, mockInsurance);
    expect(result).toHaveProperty('offerId');
    expect(typeof result.offerId).toBe('string');
    expect(result.offerId.length).toBeGreaterThan(0);
    vi.restoreAllMocks();
  });

  it('rejects when random triggers failure', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.05);
    await expect(submitOffer(mockCustomer, mockInsurance)).rejects.toThrow(
      'Server error'
    );
    vi.restoreAllMocks();
  });
});
