import type { Category } from "@/interfaces";

export const getCategories = async (): Promise<Category[]> => {
    try {
        const categories = await fetch(`/api/categories`).then(res => res.json());

        if (!categories) return [];
        return categories;
    } catch (error) {
        return [];
    }
}

export const createCategory = async ( data: Category ): Promise<Category> => {
    const category = await fetch(`/api/categories`, {
        method: 'POST',
        body: JSON.stringify( data ),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then( res => res.json() );

    // console.log({ category });

    return category;
}