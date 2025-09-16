import { ISize, IProductSize } from "./size.interface";

interface ProductOptionItem {
    name: string;
        id: string;
        isActive: boolean;
        description: string | null;
        sortOrder: number;
        accessoryId: string | null;
        costOverride: number | null; // Decimal
        groupId: string;
        imageUrl: string | null;
        extraPrice: number | null; // Decimal
        stockDeductQty: number | null; // Decimal
}

export interface ProductOptionGroup {
    id: string;
    title: string;
    description: string | null;
    isRequired: boolean;
    minSelect: number;
    maxSelect: number;
    sortOrder: number;
    items: ProductOptionItem[]
}

export interface Media {
    id: number;
    url: string;
}

export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    categoryId: string;
    images: Media[];
    price: number;
    discountPercentage?: number;
    weightGrams?: number | null;
    rating: number | null;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
    isConfigurable: boolean;
    productSizes?: IProductSize[];
    optionGroups?: ProductOptionGroup[];


    // inStock?: number;
    // sizes?: string[];
    // tags?: string[];
}