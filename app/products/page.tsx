"use client";

import { useEffect, useRef, useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import ProductList from "@/components/ProductList";
import { data } from "@/data/data";
import { Product } from "@/types/products";
import { Search, ArrowDownAZ, ArrowDownZA, RotateCcw } from "lucide-react";
import { CircleChevronUp } from "@/components/UpButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function Page() {
    const categories = [
        "All",
        "Roots",
        "Leaves",
        "Herbs",
        "Powder",
        "Seeds",
        "Flowers",
        "Spices",
        "Peel",
        "TBC",
    ];
    const originalDataRef = useRef<Product[]>(data);
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialSort = (searchParams.get("sort") as "original" | "asc" | "desc") || "original";
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"original" | "asc" | "desc">(initialSort);
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

    const updateSortOrder = (order: "original" | "asc" | "desc") => {
        const params = new URLSearchParams(searchParams.toString());

        if (order === "original") {
            params.delete("sort");
        } else {
            params.set("sort", order);
        }

        router.replace(`${pathname}?${params.toString()}`);
        setSortOrder(order);
    };

    const filteredProducts = originalDataRef.current
        .filter((product) => {
            const matchesCategory =
                activeCategory === "All" ||
                product.categories.includes(
                    activeCategory as Product["categories"][number],
                );
            const matchesSearch = product.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.name.localeCompare(b.name);
            }
            if (sortOrder === "desc") {
                return b.name.localeCompare(a.name);
            }
            return 0;
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
                <Search className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground "/>
            </div>

            <div className="flex justify-between mb-4 w-full rounded-md border bg-transparent shadow-inner backdrop-blur">
                <CategoryFilter
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelectCategory={setActiveCategory}
                />
                <div className="flex flex-wrap items-center gap-2 px-4 py-2">
                    {[
                        { key: "asc", icon: <ArrowDownAZ className="size-4" />, title: "A-Z" },
                        { key: "desc", icon: <ArrowDownZA className="size-4" />, title: "Z-A" },
                        { key: "original", icon: <RotateCcw className="size-4" />, title: "Reset" },
                    ].map(({ key, icon, title }) => {
                        const isActive = sortOrder === key;

                        return (
                            <button
                                key={key}
                                onClick={() => updateSortOrder(key as "asc" | "desc" | "original")}
                                className={`relative flex items-center gap-1 overflow-hidden rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-300${isActive
                                        ? "text-slate-900"
                                        : "text-slate-700 hover:bg-slate-700 hover:text-slate-200"
                                    }`}
                                title={title}
                            >
                                <span className="relative z-10">{icon}</span>
                                {isActive && (
                                    <motion.span
                                        layoutId="sort-highlight"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        className="absolute inset-0 z-0 rounded-md bg-gradient-to-b from-lime-200 to-lime-400"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

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
