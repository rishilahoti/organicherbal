"use client";
import { Product } from "@/types/products";
import Image from "next/image";
import PopButton from "./PopButton";

interface ProductListProps {
    products: Product[];
}
const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="flex flex-col justify-between rounded-lg border p-4 transition hover:shadow-lg"
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={160}
                        height={0}
                        quality={100}
                        loading="lazy"
                        priority={false}
                        placeholder="blur"
                        blurDataURL={product.image}
                        className="mb-4 h-56 w-full rounded-md object-fill"
                    />
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-gray-600 dark:text-neutral-400">{product.description}</p>
                    <span className="mt-2 flex justify-between text-sm text-gray-500 dark:text-neutral-300">
                        {product.categories.join(", ")}
                        <PopButton/>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ProductList;