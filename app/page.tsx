"use client";
// import { CloudDownload } from "@/components/CloudDownload";
import { Grip } from "@/components/ProductAlbum";
import Image from "next/image";

export default function Home() {
	return (
		<div className="mt-14">
			<div className="m-auto flex items-center justify-center rounded-2xl md:h-[80vh] md:w-[80%] md:justify-normal md:p-10">
				{/* drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] */}
				<div className="md:absolute md:block hidden inset-x-20 inset-y-14 mt-20">
					<Image
						src="/background.png"
						alt="background-img"
                        fill={true}
                        blurDataURL="/background.png"
                        priority
                        placeholder="blur"
                        quality={100}
						className="h-full w-full rounded-2xl object-center object-cover"
					/>
				</div>
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
		<div className="flex cursor-pointer flex-wrap justify-evenly gap-x-5 md:justify-start">
			{/* <DrawOutlineButton>
				<CloudDownload />
			</DrawOutlineButton> */}
			<DrawOutlineButton>
				<Grip />
			</DrawOutlineButton>
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
			
		</button>
	);
};
