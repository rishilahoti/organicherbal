import { z } from "zod";

export const contactFormSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	phone: z
		.string()
		.regex(
			/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
			"Invalid phone number"
		),
	email: z.string().email("Invalid email").optional().or(z.literal("")),
	company: z.string().optional(),
	service: z.string().optional(),
	message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
