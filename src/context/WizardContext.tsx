import { createContext, useState, ReactNode, useCallback } from 'react';
import type { CustomerData, InsuranceData, WizardState } from '../types/wizard';

const initialCustomerData: CustomerData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  country: '',
  province: '',
  city: '',
};

const initialInsuranceData: InsuranceData = {
  type: 'Car',
  coverage: 0,
  additionalOptions: false,
};

interface WizardContextValue {
  state: WizardState;
  setCustomerData: (data: CustomerData) => void;
  setInsuranceData: (data: InsuranceData) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const WizardContext = createContext<WizardContextValue | null>(null);

const initialState: WizardState = {
  currentStep: 1,
  customerData: initialCustomerData,
  insuranceData: initialInsuranceData,
};

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WizardState>(initialState);

  const setCustomerData = useCallback((data: CustomerData) => {
    setState((prev) => ({ ...prev, customerData: data }));
  }, []);

  const setInsuranceData = useCallback((data: InsuranceData) => {
    setState((prev) => ({ ...prev, insuranceData: data }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep >= 3) return prev;
      return { ...prev, currentStep: (prev.currentStep + 1) as 1 | 2 | 3 };
    });
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep <= 1) return prev;
      return { ...prev, currentStep: (prev.currentStep - 1) as 1 | 2 | 3 };
    });
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <WizardContext.Provider
      value={{ state, setCustomerData, setInsuranceData, nextStep, prevStep, reset }}
    >
      {children}
    </WizardContext.Provider>
  );
}
