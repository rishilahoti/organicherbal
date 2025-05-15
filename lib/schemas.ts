import { z } from "zod";

export const contactFormSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	phone: z
		.string()
		.regex(
			/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
			"Invalid phone number",
		),
	email: z.string().email(),
	company: z.string().optional(),
	service: z.string().min(1, "Please select a service"),
	message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
