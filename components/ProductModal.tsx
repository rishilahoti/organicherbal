// import { Product } from "@/types/product";

// interface ProductModalProps {
// 	product: Product;
// 	onClose: () => void;
// }

// const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
// 	return (
// 		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
// 			<div className="w-96 rounded-lg bg-white p-6">
// 				<button
// 					className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
// 					onClick={onClose}
// 				>
// 					✕
// 				</button>
// 				<img
// 					src={product.image}
// 					alt={product.name}
// 					className="mb-4 h-40 w-full rounded-md object-cover"
// 				/>
// 				<h2 className="mb-2 text-xl font-bold">{product.name}</h2>
// 				<p className="mb-4 text-gray-600">{product.description}</p>
// 				<p className="mb-6 text-sm text-gray-500">
// 					Category: <strong>{product.category}</strong>
// 				</p>
// 				<button
// 					className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
// 					onClick={() => alert(`You clicked on ${product.name}`)}
// 				>
// 					Learn More
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default ProductModal;
