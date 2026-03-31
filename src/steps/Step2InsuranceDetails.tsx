import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insuranceSchema } from '../schemas/insuranceSchema';
import type { InsuranceFormData } from '../schemas/insuranceSchema';
import { useWizard } from '../hooks/useWizard';
import { useTranslation } from '../hooks/useTranslation';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Checkbox } from '../components/Checkbox';
import { Button } from '../components/Button';
import { VehicleYearPicker } from '../components/VehicleYearPicker';
import type { InsuranceType } from '../types/wizard';

export function Step2InsuranceDetails() {
  const { state, setInsuranceData, nextStep, prevStep } = useWizard();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<InsuranceFormData>({
    resolver: zodResolver(insuranceSchema) as any,
    defaultValues: {
      type: state.insuranceData.type,
      coverage: state.insuranceData.coverage || undefined,
      additionalOptions: state.insuranceData.additionalOptions,
      vehicleYear: state.insuranceData.vehicleYear ?? undefined,
    },
  });

  const selectedType = watch('type') as InsuranceType | undefined;

  function onSubmit(data: InsuranceFormData) {
    setInsuranceData({
      type: data.type as InsuranceType,
      coverage: data.coverage,
      additionalOptions: data.additionalOptions,
      vehicleYear: data.type === 'Car' ? data.vehicleYear : undefined,
    });
    nextStep();
  }

  const typeOptions = (['Car', 'Home', 'Travel'] as const).map((val) => ({
    value: val,
    label: t(`type.${val}`),
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('step.insurance')}</h2>
      <div className="flex flex-col gap-4">
        <Select
          id="type"
          label={t('field.insuranceType')}
          placeholder={t('placeholder.selectType')}
          options={typeOptions}
          error={errors.type && t(`error.${errors.type.message}`)}
          {...register('type')}
        />
        <Input
          id="coverage"
          type="number"
          label={t('field.coverage')}
          placeholder={t('placeholder.coverage')}
          error={errors.coverage && t(`error.${errors.coverage.message}`)}
          {...register('coverage')}
        />
        {selectedType === 'Car' && (
          <Controller
            name="vehicleYear"
            control={control}
            render={({ field }) => (
              <VehicleYearPicker
                value={field.value}
                onChange={field.onChange}
                label={t('field.vehicleYear')}
                placeholder={t('placeholder.vehicleYear')}
                error={errors.vehicleYear && t(`error.${errors.vehicleYear.message}`)}
              />
            )}
          />
        )}
        <Checkbox
          id="additionalOptions"
          label={t('field.additionalOptions')}
          {...register('additionalOptions')}
        />
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="secondary" type="button" onClick={prevStep}>
          {t('button.back')}
        </Button>
        <Button type="submit">{t('button.next')}</Button>
      </div>
    </form>
  );
}
