import { z } from 'zod';
import { calculateAge } from '../utils/dateUtils';

export const customerSchema = z.object({
  firstName: z.string().min(1, 'required'),
  lastName: z.string().min(1, 'required'),
  dateOfBirth: z.string().min(1, 'dobRequired').refine(
    (val) => {
      const age = calculateAge(val);
      return age >= 18;
    },
    { message: 'ageMin' }
  ).refine(
    (val) => {
      const age = calculateAge(val);
      return age <= 100;
    },
    { message: 'ageMax' }
  ),
  city: z.string().min(1, 'required'),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
