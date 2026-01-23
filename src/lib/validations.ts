import { z } from 'zod';

/**
 * Filter form validation schema
 */
export const filterSchema = z
  .object({
    search: z.string().optional(),
    city: z.string().optional(),
    type: z.string().optional(),
    status: z.string().optional(),
    priceMin: z
      .number()
      .min(0, 'Minimum price must be 0 or greater')
      .nullable()
      .optional(),
    priceMax: z
      .number()
      .min(0, 'Maximum price must be 0 or greater')
      .nullable()
      .optional(),
    roomsMin: z.number().min(0).nullable().optional(),
    roomsMax: z.number().min(0).nullable().optional(),
    areaMin: z.number().min(0).nullable().optional(),
    areaMax: z.number().min(0).nullable().optional(),
  })
  .refine(
    (data) => {
      if (data.priceMin && data.priceMax) {
        return data.priceMin <= data.priceMax;
      }
      return true;
    },
    {
      message: 'Minimum price must be less than or equal to maximum price',
      path: ['priceMin'],
    }
  )
  .refine(
    (data) => {
      if (data.roomsMin && data.roomsMax) {
        return data.roomsMin <= data.roomsMax;
      }
      return true;
    },
    {
      message: 'Minimum rooms must be less than or equal to maximum rooms',
      path: ['roomsMin'],
    }
  );

/**
 * Contact form validation schema
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 characters')
    .max(15, 'Phone number must be at most 15 characters')
    .regex(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be at most 500 characters'),
  listingId: z.string(),
});

export type FilterFormData = z.infer<typeof filterSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
