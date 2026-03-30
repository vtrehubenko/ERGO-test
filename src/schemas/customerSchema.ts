import { z } from 'zod';

export const customerSchema = z.object({
  firstName: z.string().min(1, 'required'),
  lastName: z.string().min(1, 'required'),
  age: z.coerce
    .number({ error: 'mustBeNumber' })
    .int('mustBeInteger')
    .min(18, 'ageMin')
    .max(100, 'ageMax'),
  city: z.string().min(1, 'required'),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
