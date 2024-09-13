import * as z from 'zod';

export const SettingsSchema = z
  .object({
    name: z.optional(z.string().min(2, { message: 'Name must be at least 2 characters long' })),
    email: z.optional(z.string().email({ message: 'Please enter a valid email address' })),
    image: z.optional(z.string().url({ message: 'Please enter a valid URL' })),
    password: z.optional(
      z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    ),
    newPassword: z.optional(
      z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.password && data.newPassword && data.password === data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'New password must be different from the current password',
    },
  );
