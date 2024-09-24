"use client";

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

const circles = [
	{ cx: 19, cy: 5 }, // Top right
	{ cx: 12, cy: 5 }, // Top middle
	{ cx: 19, cy: 12 }, // Middle right
	{ cx: 5, cy: 5 }, // Top left
	{ cx: 12, cy: 12 }, // Center
	{ cx: 19, cy: 19 }, // Bottom right
	{ cx: 5, cy: 12 }, // Middle left
	{ cx: 12, cy: 19 }, // Bottom middle
	{ cx: 5, cy: 19 }, // Bottom left
];

interface GripProps extends React.SVGAttributes<SVGSVGElement> {
	width?: number;
	height?: number;
	strokeWidth?: number;
	stroke?: string;
}

const Grip = ({
	width = 24,
	height = 24,
	strokeWidth = 2,
	...props
}: GripProps) => {
	const controls = useAnimation();

	useEffect(() => {
		let isMounted = true;

		const animateCircles = async () => {
			await controls.start((i) => ({
				opacity: 0.3,
				transition: {
					delay: i * 0.1,
					duration: 0.2,
				},
			}));
			await controls.start((i) => ({
				opacity: 1,
				transition: {
					delay: i * 0.1,
					duration: 0.2,
				},
			}));
			if (isMounted) animateCircles();
		};

		animateCircles();

		return () => {
			isMounted = false;
		};
	}, [controls]);

	return (
		<motion.div
			style={{
				cursor: "pointer",
				userSelect: "none",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "0.5rem",
			}}
		>
			<Link href={"/products"} className="flex gap-[0.5rem]">
				<span>Products</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width}
					height={height}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeLinejoin="round"
					{...props}
				>
					{circles.map((circle, index) => (
						<motion.circle
							key={`${circle.cx}-${circle.cy}`}
							cx={circle.cx}
							cy={circle.cy}
							r="1"
							initial={{ opacity: 1 }}
							animate={controls}
							custom={index}
						/>
					))}
				</svg>
			</Link>
		</motion.div>
	);
};

export { Grip };
