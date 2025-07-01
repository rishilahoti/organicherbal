"use client";

import { motion } from "framer-motion";

type CategoryFilterProps = {
    categories: string[];
    activeCategory: string;
    onSelectCategory: (category: string) => void;
};

export default function CategoryFilter({
    categories,
    activeCategory,
    onSelectCategory,
}: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap items-center gap-2 px-4 py-2">
            {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`relative overflow-hidden rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${isActive
                                ? "text-slate-900"
                                : "dark:text-slate-300 text-slate-600 hover:bg-slate-700 hover:text-slate-200"
                            }`}
                    >
                        <span className="relative z-10">{category}</span>
                        {isActive && (
                            <motion.span
                                layoutId="category-highlight"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute inset-0 z-0 rounded-md bg-gradient-to-b from-lime-200 to-lime-400"
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
