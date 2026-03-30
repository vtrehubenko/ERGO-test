import { useTranslation } from '../hooks/useTranslation';

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

const stepKeys = ['step.customer', 'step.insurance', 'step.summary'] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center gap-8 mb-8">
      {stepKeys.map((key, index) => {
        const stepNumber = (index + 1) as 1 | 2 | 3;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={key} className="flex flex-col items-center gap-1">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white transition-colors
                ${isActive || isCompleted ? 'bg-[#BF1528]' : 'bg-[#575756]'}`}
            >
              {isCompleted ? '✓' : stepNumber}
            </div>
            <span
              className={`text-xs transition-colors
                ${isActive ? 'text-[#BF1528] font-semibold' : 'text-[#575756]'}`}
            >
              {t(key)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
