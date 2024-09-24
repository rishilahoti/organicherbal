import { motion } from "framer-motion";

interface CategoryFilterProps {
	categories: string[];
	activeCategory: string;
	onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
	categories,
	activeCategory,
	onSelectCategory,
}) => {
	return (
		<div className="flex flex-wrap items-center gap-2 px-4 py-2">
			{categories.map((category) => (
				<button
					key={category}
					onClick={() => onSelectCategory(category)}
					className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
						activeCategory === category
							? "text-slate-900"
							: "hover:bg-slate-700 hover:text-slate-200"
					}`}
				>
					<span className="relative z-10">{category}</span>
					{activeCategory === category && (
						<motion.span
							layoutId="highlight"
							transition={{ type: "spring", duration: 0.5 }}
							className="absolute inset-0 z-0 rounded-md bg-gradient-to-b from-lime-200 to-lime-400"
						></motion.span>
					)}
				</button>
			))}
		</div>
	);
};

export default CategoryFilter;
