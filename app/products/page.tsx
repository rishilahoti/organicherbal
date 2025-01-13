"use client";

import { useEffect, useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import ProductList from "@/components/ProductList";
import { data } from "@/data/data";
import { Product } from "@/types/products";
import { Search } from "lucide-react";
import { CircleChevronUp } from "@/components/UpButton";

export default function Page() {
	const categories = [
		"All",
		"Roots",
		"Herbs",
		"Powder",
		"Seeds",
		"Flowers",
		"Spices",
		"Peel",
		"TBC",
	];
	const [activeCategory, setActiveCategory] = useState<string>("All");
	const [searchQuery, setSearchQuery] = useState<string>("");

	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsVisible(window.scrollY > 350);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const filteredProducts = data.filter((product) => {
		const matchesCategory =
			activeCategory === "All" ||
			product.categories.includes(
				activeCategory as Product["categories"][number],
			);

		const matchesSearch = product.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());

		return matchesCategory && matchesSearch;
	});

	return (
		<div className="mx-auto max-w-7xl p-6 pt-8" id="top">
			<h1 className="mb-4 text-2xl font-bold">Our Products</h1>
			<div className="sticky top-[100px] z-50 mb-4">
				<input
					type="text"
					placeholder="Search products..."
					className="w-full rounded-md border bg-transparent p-2 shadow-inner backdrop-blur"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<Search className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
			</div>

			<CategoryFilter
				categories={categories}
				activeCategory={activeCategory}
				onSelectCategory={setActiveCategory}
			/>
			<ProductList products={filteredProducts} />
			{isVisible && (
				<div
					className="sticky bottom-5 z-50 w-fit"
					onClick={scrollToTop}
				>
					<CircleChevronUp />
				</div>
			)}
		</div>
	);
}
