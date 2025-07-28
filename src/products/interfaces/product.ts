export interface Product {
    id: number;
    title: string;
    description?: string;
    category?: string;
    thumbnail: string;
    price: number;
    discountPercentage?: number;
    rating: number;
    link?: string;
}