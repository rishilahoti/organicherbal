"use client";
import { motion } from "motion/react";

export default function Page() {
	return (
		<div className="mt-14">
			<div className="grid place-content-center">
				<h1 className="max-w-2xl bg-gradient-to-t from-[#434343] to-slate-950 bg-clip-text text-center text-4xl font-semibold leading-snug text-transparent dark:hidden md:text-6xl">
					Lets{" "}
					<span className="relative">
						<span className="bg-gradient-to-t from-lime-200 to-lime-400 bg-clip-text text-transparent">Connect</span>
						<svg
							viewBox="0 0 286 73"
							fill="none"
							className="absolute -left-2 -right-2 -top-1 bottom-0 translate-y-1"
						>
							<motion.path
								initial={{ pathLength: 0 }}
								whileInView={{ pathLength: 1 }}
								transition={{
									duration: 1.25,
									ease: "easeInOut",
								}}
								d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
								stroke="#fa709a"
								strokeWidth="3"
							/>
						</svg>
					</span>{" "}
					Via <br />a Simple Form
				</h1>

				<h1 className="hidden bg-gradient-to-t from-[#f5f7fa] to-[#c3cfe2] bg-clip-text text-center text-4xl font-semibold leading-snug text-transparent dark:block md:text-6xl">
					Lets{" "}
					<span className="relative bg-gradient-to-t from-lime-200 to-lime-400 bg-clip-text text-transparent">
						Connect
						<svg
							viewBox="0 0 286 73"
							fill="none"
							className="absolute -left-2 -right-2 -top-1 bottom-0 translate-y-1"
						>
							<motion.path
								initial={{ pathLength: 0 }}
								whileInView={{ pathLength: 1 }}
								transition={{
									duration: 1.25,
									ease: "easeInOut",
								}}
								d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
								stroke="#fa709a"
								strokeWidth="3"
							/>
						</svg>
					</span>{" "}
					Via <br />a Simple Form
				</h1>
			</div>
		</div>
	);
}
