'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string({required_error: 'Name is required.'}).min(2, 'Name must be at least 2 characters.'),
  email: z.string({required_error: 'Email is required.'}).email('Invalid email address.'),
  message: z.string({required_error: 'Message is required.'}).min(10, 'Message must be at least 10 characters.'),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check your input.',
      success: false,
    };
  }

  // In a real app, you would send an email or save to a database here.
  // For this demo, we'll just log it and return success.
  console.log('Form submitted:', validatedFields.data);

  return {
    message: 'Thank you! Your message has been sent successfully.',
    success: true,
    errors: undefined,
  };
}
