import { create } from "zustand";

interface WishlistState {
    wishlist: string[]; // array of productIds
    setItems: (ids: string[]) => void;
    toggle: (id: string) => void;
    clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    (set, get ) => ({

        wishlist: [],

        setItems: (ids) => set({ wishlist: ids }),

        toggle: (id) => {
            const current = get().wishlist;
            if (current.includes(id)) {
                set({ wishlist: current.filter((pid) => pid !== id) });
            } else {
                set({ wishlist: [...current, id]})
            }
        },

        clear: () => set({ wishlist: [] }),
    })
)