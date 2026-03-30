import { useWizard } from './hooks/useWizard';
import { useTranslation } from './hooks/useTranslation';
import { StepIndicator } from './components/StepIndicator';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Step1CustomerData } from './steps/Step1CustomerData';
import { Step2InsuranceDetails } from './steps/Step2InsuranceDetails';
import { Step3Summary } from './steps/Step3Summary';

const steps = {
  1: Step1CustomerData,
  2: Step2InsuranceDetails,
  3: Step3Summary,
} as const;

function WizardContent() {
  const { state } = useWizard();
  const { t } = useTranslation();
  const StepComponent = steps[state.currentStep];

  return (
    <div className="min-h-screen bg-[#D9D9D9] px-4 py-8">
      <div className="mx-auto max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{t('app.title')}</h1>
          <LanguageSwitcher />
        </div>
        <StepIndicator currentStep={state.currentStep} />
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <StepComponent />
        </div>
      </div>
    </div>
  );
}

function App() {
  return <WizardContent />;
}

export default App;
