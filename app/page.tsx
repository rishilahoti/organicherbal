"use client";
import { CloudDownload } from "@/components/CloudDownload";
import { Grip } from "@/components/ProductAlbum";
import Image from "next/image";

export default function Home() {
	return (
		<div className="mt-14">
			<div className="m-auto flex items-center justify-center rounded-2xl md:h-[80vh] md:w-[80%] md:justify-normal md:bg-[url(/background.svg)] md:bg-cover md:bg-center md:bg-no-repeat md:p-10">
				{/* drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] */}
				<div className="flex h-[90%] w-[90%] flex-col justify-center gap-y-[30px] rounded-2xl bg-transparent bg-opacity-15 p-3 shadow-md backdrop-blur md:w-[55%] md:p-5">
					<h3 className="mx-auto bg-gradient-to-t from-lime-200 to-lime-400 bg-clip-text text-[22px] font-extrabold text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:mx-0 md:text-4xl">
						ORGANIC / CONVENTIONAL
					</h3>
					<span className="block text-center text-2xl font-semibold md:text-left md:font-bold">
						Traders & Exporters of Herbs, Spices, Powders, Oil Seeds
						and other Agri Commodities
					</span>

					<Image
						src="/descri-2.jpg"
						alt="Ashwagandha"
						width={500}
						height={500}
						className="mx-auto rounded-lg md:hidden"
					/>

					<p className="hidden text-[21px] font-semibold md:block md:text-[17.5px]">
						We have the best quality of
						<strong className="font-semibold">
							{" "}
							Herbs, Spices, Oil Seeds, and Powders
						</strong>{" "}
						that are sourced directly from farmers or grown
						in-house. We ensure that the quality of the raw
						materials is top notch.
					</p>
					<ButtonHover></ButtonHover>
				</div>
			</div>
		</div>
	);
}

const ButtonHover = () => {
	return (
		<div className="flex cursor-pointer flex-wrap justify-evenly md:justify-start gap-x-5">
			<DrawOutlineButton>
				<CloudDownload />
			</DrawOutlineButton>
			<DrawOutlineButton><Grip/></DrawOutlineButton>
		</div>
	);
};

const DrawOutlineButton = ({
	children,
	...rest
}: React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) => {
	return (
		<button
			{...rest}
			className="duration-\[400ms\] group relative font-medium transition-colors hover:text-lime-400"
		>
			<span className="flex flex-wrap">{children}</span>
			<span className="absolute left-0 top-0 h-[2px] w-0 bg-lime-400 transition-all duration-100 group-hover:w-full" />
			<span className="absolute right-0 top-0 h-0 w-[2px] bg-lime-400 transition-all delay-100 duration-100 group-hover:h-full" />
			<span className="absolute bottom-0 right-0 h-[2px] w-0 bg-lime-400 transition-all delay-200 duration-100 group-hover:w-full" />
			<span className="absolute bottom-0 left-0 h-0 w-[2px] bg-lime-400 transition-all delay-300 duration-100 group-hover:h-full" />
		</button>
	);
};
