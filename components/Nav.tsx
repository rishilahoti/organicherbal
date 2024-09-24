"use client";
import { Menu } from "lucide-react";
import React from "react";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "./ui/navigation-menu";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import LogoLight from "../public/logo_light.png";
import LogoDark from "../public/logo_dark.png";

interface RouteProps {
	href: string;
	label: string;
}

const routeList: RouteProps[] = [
	{
		href: "/",
		label: "Home",
	},
	{
		href: "/products",
		label: "Products",
	},
	{
		href: "/contact",
		label: "Contact",
	},
];

export const Nav = () => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<header className="sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between rounded-2xl border bg-transparent bg-opacity-15 p-2 shadow-inner backdrop-blur md:w-[70%] lg:w-[75%] lg:max-w-screen-xl">
			<Link href="/" className="ml-2 flex items-center gap-3">
				<Image
					src={LogoDark}
					alt="Logo"
					className="hidden h-[45px] w-auto rounded-full dark:block"
				/>
				<Image
					src={LogoLight}
					alt="Logo"
					className="block h-[45px] w-auto rounded-full dark:hidden"
				/>
				<span className="bg-gradient-to-t from-lime-200 to-lime-400 bg-clip-text text-xl font-bold text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] md:text-2xl">
					Organic Herbal
				</span>
			</Link>
			<div className="flex items-center lg:hidden">
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Menu
							onClick={() => setIsOpen(!isOpen)}
							className="cursor-pointer lg:hidden"
						/>
					</SheetTrigger>

					<SheetContent
						side="left"
						className="flex flex-col justify-between rounded-br-2xl rounded-tr-2xl border-secondary bg-card backdrop-blur"
					>
						<div>
							<SheetHeader className="mb-4 ml-4">
								<SheetTitle className="flex items-center">
									<Link
										href="/"
										className="flex items-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-sky-400 via-green-600 to-indigo-50 bg-clip-text text-lg font-bold text-transparent"
									>
										Organic Herbal
									</Link>
								</SheetTitle>
							</SheetHeader>
							{/* Mobile */}
							<div className="flex flex-col gap-2">
								{routeList.map(({ href, label }) => (
									<Button
										key={href}
										onClick={() => setIsOpen(false)}
										asChild
										variant="ghost"
										className="justify-start text-base font-semibold hover:underline hover:underline-offset-4"
									>
										<Link href={href}>{label}</Link>
									</Button>
								))}
							</div>
						</div>

						<SheetFooter className="flex-col items-start justify-start sm:flex-col">
							<Separator className="mb-2" />

							<ThemeToggle />
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
			{/* Desktop */}
			<NavigationMenu className="mx-auto hidden bg-transparent lg:block">
				<NavigationMenuList>
					<NavigationMenuItem>
						{routeList.map(({ href, label }) => (
							<NavigationMenuLink key={href} asChild>
								<Link
									href={href}
									className="px-2 text-base font-medium hover:underline hover:underline-offset-4"
								>
									{label}
								</Link>
							</NavigationMenuLink>
						))}
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			<div className="hidden lg:flex">
				<ThemeToggle />
			</div>
		</header>
	);
};
