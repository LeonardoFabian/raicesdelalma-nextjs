export interface Cart {
    method: string;
    count: number;
}

export const getCount = async (): Promise<Cart> => {
    const data = await fetch('/api/cart').then( res => res.json() );
    console.log({ data });
    return data;
}