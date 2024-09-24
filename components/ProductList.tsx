import { Product } from "@/types/products";
import Image from "next/image";

interface ProductListProps {
	products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{products.map((product) => (
				<div
					key={product.id}
					className="rounded-lg border p-4 transition hover:shadow-lg"
				>
					<Image
						src={product.image}
						alt={product.name}
						width={0}
						height={0}
						className="mb-4 h-40 w-full rounded-md object-cover"
					/>
					<h2 className="text-lg font-semibold">{product.name}</h2>
					<p className="text-gray-600">{product.description}</p>
					<span className="mt-2 block text-sm text-gray-500">
						Category: {product.categories.join(", ")}
					</span>
				</div>
			))}
		</div>
	);
};

export default ProductList;

{
	/*
import { useState } from 'react';
import { Product } from '@/types/product';
import ProductModal from './ProductModal';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <span className="text-sm text-gray-500 mt-2 block">
              Category: {product.category}
            </span>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductList;

*/
}
