/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, type NextRequest } from "next/server";
import sgMail from "@sendgrid/mail";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";

// Schema validation
const schema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	phone: z
		.string()
		.regex(
			/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
			"Invalid phone number",
		),
	email: z.string().optional(),
	company: z.string().optional(),
	service: z.string().optional(),
	message: z.string().optional(),
});

// Early error handling for missing envs
if (
	!process.env.SENDGRID_API_KEY ||
	!process.env.CONTACT_EMAIL ||
	!process.env.SENDER_EMAIL
) {
	throw new Error("Missing required environment variables for SendGrid");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Rate limiter (10 requests per 60 seconds)
const ratelimit = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(10, "60 s"),
});

export async function POST(request: NextRequest) {
	const ip =
		request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
		"127.0.0.1";

	const { success } = await ratelimit.limit(ip);
	if (!success) {
		return NextResponse.json(
			{ error: "Too many requests. Please try again later." },
			{ status: 429 },
		);
	}

	let body;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json(
			{ error: "Invalid JSON body" },
			{ status: 400 },
		);
	}

	const result = schema.safeParse(body);
	if (!result.success) {
		return NextResponse.json(
			{ error: result.error.flatten() },
			{ status: 400 },
		);
	}

	try {
		const { name, phone, email, company, service, message } = result.data;

		const msg = {
			to: process.env.CONTACT_EMAIL!,
			from: process.env.SENDER_EMAIL!,
			subject: `New Contact Form Submission - ${service}`,
			text: `
Name: ${name}
Phone: ${phone}
Email: ${email}
Company: ${company || "N/A"}
Service: ${service}
Message: ${message}
      `,
			html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
		};

		await sgMail.send(msg);
		return NextResponse.json({ success: true });
	} catch (error: any) {
		console.error("SendGrid Error:", error?.response?.body || error);
		return NextResponse.json(
			{ error: "Failed to send message" },
			{ status: 500 },
		);
	}
}
