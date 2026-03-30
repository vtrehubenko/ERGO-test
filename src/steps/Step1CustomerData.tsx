import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema } from '../schemas/customerSchema';
import type { CustomerFormData } from '../schemas/customerSchema';
import { useWizard } from '../hooks/useWizard';
import { useTranslation } from '../hooks/useTranslation';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { DateOfBirthPicker } from '../components/DateOfBirthPicker';
import { CityAutocomplete } from '../components/CityAutocomplete';
import { getProvinces } from '../data/locations';
import type { CountryCode } from '../data/locations';

const countryOptions: { value: CountryCode; labelKey: string }[] = [
  { value: 'PL', labelKey: 'country.PL' },
  { value: 'US', labelKey: 'country.US' },
];

export function Step1CustomerData() {
  const { state, setCustomerData, nextStep } = useWizard();
  const { t, language } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      ...state.customerData,
      country: state.customerData.country || (language === 'pl' ? 'PL' : 'US'),
    },
  });

  const selectedCountry = (watch('country') as CountryCode) || 'PL';
  const selectedProvince = watch('province') || '';

  const provinceOptions = getProvinces(selectedCountry).map((p) => ({
    value: p,
    label: p,
  }));

  function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setValue('country', e.target.value);
    setValue('province', '');
    setValue('city', '');
  }

  function handleProvinceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setValue('province', e.target.value);
    setValue('city', '');
  }

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
        <Select
          id="country"
          label={t('field.country')}
          placeholder={t('placeholder.selectCountry')}
          options={countryOptions.map((c) => ({ value: c.value, label: t(c.labelKey) }))}
          error={errors.country && t(`error.${errors.country.message}`)}
          value={selectedCountry}
          {...register('country', { onChange: handleCountryChange })}
        />
        <Select
          id="province"
          label={t('field.province')}
          placeholder={t('placeholder.selectProvince')}
          options={provinceOptions}
          error={errors.province && t(`error.${errors.province.message}`)}
          value={selectedProvince}
          {...register('province', { onChange: handleProvinceChange })}
        />
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <CityAutocomplete
              value={field.value}
              onChange={field.onChange}
              country={selectedCountry}
              province={selectedProvince}
              label={t('field.city')}
              placeholder={t('placeholder.city')}
              error={errors.city && t(`error.${errors.city.message}`)}
            />
          )}
        />
      </div>
      <div className="flex justify-end mt-8">
        <Button type="submit">{t('button.next')}</Button>
      </div>
    </form>
  );
}
