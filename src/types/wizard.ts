export interface CustomerData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  city: string;
}

export interface InsuranceData {
  type: InsuranceType;
  coverage: number;
  additionalOptions: boolean;
  vehicleYear?: number;
}

export type InsuranceType = 'Car' | 'Home' | 'Travel';

export interface WizardState {
  currentStep: 1 | 2 | 3;
  customerData: CustomerData;
  insuranceData: InsuranceData;
}

export interface RiskResult {
  score: number;
  level: 'Low' | 'Medium' | 'High';
}

export const INSURANCE_TYPE_FACTORS: Record<InsuranceType, number> = {
  Car: 3,
  Home: 2,
  Travel: 1,
};
