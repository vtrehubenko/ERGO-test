import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema } from '../schemas/customerSchema';
import type { CustomerFormData } from '../schemas/customerSchema';
import { useWizard } from '../hooks/useWizard';
import { useTranslation } from '../hooks/useTranslation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { DateOfBirthPicker } from '../components/DateOfBirthPicker';

export function Step1CustomerData() {
  const { state, setCustomerData, nextStep } = useWizard();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: state.customerData,
  });

  function onSubmit(data: CustomerFormData) {
    setCustomerData(data);
    nextStep();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('step.customer')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="firstName"
          label={t('field.firstName')}
          placeholder={t('placeholder.firstName')}
          error={errors.firstName && t(`error.${errors.firstName.message}`)}
          {...register('firstName')}
        />
        <Input
          id="lastName"
          label={t('field.lastName')}
          placeholder={t('placeholder.lastName')}
          error={errors.lastName && t(`error.${errors.lastName.message}`)}
          {...register('lastName')}
        />
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <DateOfBirthPicker
              value={field.value}
              onChange={field.onChange}
              label={t('field.dateOfBirth')}
              placeholder={t('placeholder.dateOfBirth')}
              error={errors.dateOfBirth && t(`error.${errors.dateOfBirth.message}`)}
            />
          )}
        />
        <Input
          id="city"
          label={t('field.city')}
          placeholder={t('placeholder.city')}
          error={errors.city && t(`error.${errors.city.message}`)}
          {...register('city')}
        />
      </div>
      <div className="flex justify-end mt-8">
        <Button type="submit">{t('button.next')}</Button>
      </div>
    </form>
  );
}
