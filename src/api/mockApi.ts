import type { CustomerData, InsuranceData } from '../types/wizard';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateOfferId(): string {
  return `OFF-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function submitOffer(
  _customer: CustomerData,
  _insurance: InsuranceData
): Promise<{ offerId: string }> {
  await delay(1000 + Math.random() * 1000);

  if (Math.random() < 0.1) {
    throw new Error('Server error');
  }

  return { offerId: generateOfferId() };
}
