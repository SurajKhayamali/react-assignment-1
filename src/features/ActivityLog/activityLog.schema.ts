import { z } from 'zod';

export const userDetailSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be at most 30 characters long'),
  age: z.coerce
    .number()
    .int('Age must be an integer')
    .positive('Age must be a positive number'),
  contactNumber: z.string().regex(/^\d{10,15}$/, {
    message: 'Contact number must be between 10 and 15 digits',
  }),
});

export const activitySchema = z.object({
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters long')
    .max(100, 'Description must be at most 100 characters long'),
  timeSpent: z.coerce
    .number()
    .min(0, 'Time spent must be greater than or equal to 0')
    .max(1440, 'Time spent must be less than or equal to 1440'),
});

export const activityDetailSchema = z.object({
  user: userDetailSchema,
  activities: z.array(activitySchema),
});
