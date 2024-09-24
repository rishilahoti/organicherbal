"use client";

import type { Transition } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface CloudDownloadProps extends React.SVGAttributes<SVGSVGElement> {
	width?: number;
	height?: number;
	strokeWidth?: number;
	stroke?: string;
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 250,
	damping: 25,
};

const handleDownload = () => {
	const link = document.createElement("a");
	link.href = "/catalogue.pdf";
	link.download = "catalogue.pdf";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

const CloudDownload = ({
	width = 24,
	height = 24,
	strokeWidth = 2,
	...props
}: CloudDownloadProps) => {
	const controls = useAnimation();
	useEffect(() => {
		controls.start("animate");
	}, [controls]);

	return (
		<div
			style={{
				cursor: "pointer",
				userSelect: "none",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				gap: "0.5rem",
				padding: "0.5rem",
			}}
			onClick={handleDownload}
		>
			<span>Catalogue</span>
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
				<motion.path
					variants={{
						normal: { pathLength: 1, opacity: 1 },
						animate: { pathLength: 1, opacity: 1 },
					}}
					transition={defaultTransition}
					animate={controls}
					initial="normal"
					d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"
				/>
				<motion.g
					variants={{
						normal: { y: 0 },
						animate: {
							y: [0, 3, 0],
							transition: { repeat: Infinity, duration: 1.5 },
						},
					}}
					animate={controls}
					initial="normal"
				>
					<path d="M12 13v8l-4-4" />
					<path d="m12 21 4-4" />
				</motion.g>
			</svg>
		</div>
	);
};

export { CloudDownload };
