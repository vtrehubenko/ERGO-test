import { z } from 'zod';

export const insuranceSchema = z
  .object({
    type: z.enum(['Car', 'Home', 'Travel'], {
      error: 'required',
    }),
    coverage: z.coerce
      .number({ error: 'mustBeNumber' })
      .min(1000, 'coverageMin'),
    additionalOptions: z.boolean().default(false),
    vehicleYear: z.coerce.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'Car' && !data.vehicleYear) {
      ctx.addIssue({
        code: 'custom',
        message: 'vehicleYearRequired',
        path: ['vehicleYear'],
      });
    }
  });

export type InsuranceFormData = z.infer<typeof insuranceSchema>;
