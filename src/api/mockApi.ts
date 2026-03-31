import type { CustomerData, InsuranceData } from '../types/wizard';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateOfferId(): string {
  return `OFF-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function submitOffer(
  _customer: CustomerData, // eslint-disable-line @typescript-eslint/no-unused-vars
  _insurance: InsuranceData // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<{ offerId: string }> {
  await delay(1000 + Math.random() * 1000);

  if (Math.random() < 0.1) {
    const error = new Error('Server error');
    console.error('submitOffer failed:', error);
    throw error;
  }

  return { offerId: generateOfferId() };
}
