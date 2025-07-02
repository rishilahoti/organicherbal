/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";
import { contactFormSchema } from "@/lib/schemas";

type FormData = {
    name: string;
    phone: string;
    email: string;
    company?: string;
    service: string;
    message: string;
};

const servicesOptions = [
    "Buy Roots",
    "Buy Herbs",
    "Buy Powders",
    "Buy Seeds",
    "Buy Flowers",
    "Buy Spices",
    "Buy Peel",
    "Enquire about a product",
];

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        phone: "",
        email: "",
        company: "",
        service: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const validateField = (name: string, value: string) => {
        try {
            contactFormSchema.pick({ [name]: true } as any).parse({ [name]: value });
            setErrors((prev) => ({ ...prev, [name]: "" }));
        } catch (err: any) {
            setErrors((prev) => ({ ...prev, [name]: err.errors[0].message }));
        }
    };

    // Load form from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("contactFormData");
        if (saved) {
            setFormData(JSON.parse(saved));
        }
    }, []);

    // Save to localStorage only if valid
    useEffect(() => {
        if (formData.name || formData.email || formData.message) {
            localStorage.setItem("contactFormData", JSON.stringify(formData));
        }
    }, [formData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSubmitStatus(null); // Reset status on input
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitStatus(null);

        const result = contactFormSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            for (const issue of result.error.issues) {
                fieldErrors[issue.path[0]] = issue.message;
            }
            setErrors(fieldErrors);
            setSubmitStatus("error");
            setSubmitting(false);
            return;
        }

        // Client-side basic validation
        if (!phoneRegex.test(formData.phone)) {
            setSubmitStatus("error");
            setSubmitting(false);
            console.error("Invalid phone number");
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (res.ok) {
                setSubmitStatus("success");
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    company: "",
                    service: "",
                    message: "",
                });
                localStorage.removeItem("contactFormData");
            } else {
                console.error(data.error);
                setSubmitStatus("error");
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            setSubmitStatus("error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="mx-auto rounded-lg p-5 md:min-w-[400px] bg-white dark:bg-slate-950 bg-opacity-85 backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {[
                { id: "name", label: "Name", type: "text", required: true },
                { id: "phone", label: "Phone", type: "tel", required: true },
                { id: "email", label: "Email", type: "email", required: false },
                { id: "company", label: "Company Name", type: "text", required: false },
            ]
                .map(({ id, label, type, required }) => (
                    <div key={id} className="mb-4">
                        <label htmlFor={id} className="mb-2 block text-gray-700 dark:text-gray-50">
                            {label}
                        </label>
                        <input
                            type={type}
                            id={id}
                            name={id}
                            value={(formData as any)[id]}
                            onChange={handleChange}
                            onBlur={(e) => validateField(e.target.name, e.target.value)}
                            required={required}
                            className={`w-full rounded-md border px-3 py-2 ${errors[id] ? "border-red-500" : ""}`}
                            aria-required={required}
                            aria-label={label}
                            placeholder={`Enter your ${label.toLowerCase()}`}
                        />
                        {errors[id] && <p className="mt-1 text-sm text-red-600">{errors[id]}</p>}
                    </div>
                ))}

            <div className="mb-4">
                <label htmlFor="service" className="mb-2 block text-gray-700 dark:text-gray-50">
                    Service
                </label>
                <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-md border px-3 py-2"
                >
                    <option value="">Select a service (optional)</option>
                    {servicesOptions.map((service) => (
                        <option key={service} value={service}>
                            {service}
                        </option>
                    ))}
                </select>

            </div>

            <div className="mb-4">
                <label htmlFor="message" className="mb-2 block text-gray-700 dark:text-gray-50">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={(e) => validateField("message", e.target.value)}
                    className={`h-16 w-full rounded-md border px-3 py-2 ${errors.message ? "border-red-500" : ""}`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
            >
                {submitting ? (
                    <>
                        <FiLoader className="animate-spin" />
                        Submitting...
                    </>
                ) : (
                    "Submit"
                )}
            </button>

            {submitStatus && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-3 flex items-center gap-2 rounded-md p-2 ${submitStatus === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                >
                    {submitStatus === "success" ? (
                        <>
                            <FiCheckCircle />
                            Message sent successfully!
                        </>
                    ) : (
                        <>
                            <FiAlertCircle />
                            Error sending message. Please check your input and try again.
                        </>
                    )}
                </motion.div>
            )}
        </motion.form>
    );
}
