import { useState } from 'react';
import { useWizard } from '../hooks/useWizard';
import { useTranslation } from '../hooks/useTranslation';
import { calculateRisk } from '../utils/riskCalculation';
import { calculateAge, formatDateOfBirth } from '../utils/dateUtils';
import { submitOffer } from '../api/mockApi';
import { Button } from '../components/Button';
import type { Language } from '../context/LanguageContext';

const riskColorMap = {
  Low: 'text-green-600 bg-green-50 border-green-200',
  Medium: 'text-amber-600 bg-amber-50 border-amber-200',
  High: 'text-[#BF1528] bg-red-50 border-red-200',
} as const;

export function Step3Summary() {
  const { state, prevStep, reset } = useWizard();
  const { t, language } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [offerId, setOfferId] = useState<string>('');

  const { customerData, insuranceData } = state;
  const age = calculateAge(customerData.dateOfBirth);
  const risk = calculateRisk({
    age,
    coverage: insuranceData.coverage,
    type: insuranceData.type,
  });

  async function handleSubmit() {
    setStatus('loading');
    try {
      const result = await submitOffer(customerData, insuranceData);
      setOfferId(result.offerId);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">&#10003;</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('submit.success')}</h2>
        <p className="text-[#575756] mb-1">{t('submit.offerId')}</p>
        <p className="font-mono text-lg font-bold text-[#BF1528] mb-8">{offerId}</p>
        <Button onClick={reset}>{t('button.newOffer')}</Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('step.summary')}</h2>

      {/* Customer Info */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-[#575756] uppercase tracking-wide mb-3">
          {t('summary.customerTitle')}
        </h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="text-[#575756]">{t('summary.name')}</span>
          <span className="font-medium">{customerData.firstName} {customerData.lastName}</span>
          <span className="text-[#575756]">{t('summary.dateOfBirth')}</span>
          <span className="font-medium">{formatDateOfBirth(customerData.dateOfBirth, language as Language)}</span>
          <span className="text-[#575756]">{t('summary.age')}</span>
          <span className="font-medium">{age}</span>
          <span className="text-[#575756]">{t('summary.country')}</span>
          <span className="font-medium">{t(`country.${customerData.country}`)}</span>
          <span className="text-[#575756]">{t('summary.province')}</span>
          <span className="font-medium">{customerData.province}</span>
          <span className="text-[#575756]">{t('summary.city')}</span>
          <span className="font-medium">{customerData.city}</span>
        </div>
      </div>

      {/* Insurance Info */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-[#575756] uppercase tracking-wide mb-3">
          {t('summary.insuranceTitle')}
        </h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="text-[#575756]">{t('summary.type')}</span>
          <span className="font-medium">{t(`type.${insuranceData.type}`)}</span>
          <span className="text-[#575756]">{t('summary.coverage')}</span>
          <span className="font-medium">{insuranceData.coverage.toLocaleString()}</span>
          <span className="text-[#575756]">{t('summary.additionalOptions')}</span>
          <span className="font-medium">{insuranceData.additionalOptions ? t('summary.yes') : t('summary.no')}</span>
          {insuranceData.vehicleYear && (
            <>
              <span className="text-[#575756]">{t('summary.vehicleYear')}</span>
              <span className="font-medium">{insuranceData.vehicleYear}</span>
            </>
          )}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className={`mb-8 rounded-lg border p-4 ${riskColorMap[risk.level]}`}>
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-2">
          {t('risk.title')}
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm">{t('risk.score')}: </span>
            <span className="font-bold text-lg">{risk.score}</span>
          </div>
          <div className="text-lg font-bold">{t(`risk.${risk.level}`)}</div>
        </div>
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-[#BF1528]">
          {t('submit.error')}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="secondary" type="button" onClick={prevStep} disabled={status === 'loading'}>
          {t('button.back')}
        </Button>
        <Button onClick={handleSubmit} disabled={status === 'loading'}>
          {status === 'loading' ? t('submit.loading') : t('button.submit')}
        </Button>
      </div>
    </div>
  );
}
