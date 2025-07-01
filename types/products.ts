export interface Product {
	id: number;
	name: string;
	categories: (
		| "Herbs"
		| "Roots"
        | "Leaves"
		| "Spices"
		| "Powder"
		| "Seeds"
		| "Flowers"
        | "Peel"
		| "TBC"
	)[];
	image: string;
	description: string;
}

// Remove all "" from the keys not values, rename category to categories, resort them into these categories: (
// 		| "Herbs"
// 		| "Roots"
// 		| "Spices"
// 		| "Powder"
// 		| "Seeds"
// 		| "Flowers"
//         | "Peel"
// 		| "TBC"
// 	)[];