import create from "zustand";

export const useCartStore = create((set) => ({
  items: {},
  addItem: (item) =>
    set((state) => ({
      items: {
        ...state.items,
        [item.id]: {
          ...item,
          quantity: (state.items[item.id]?.quantity || 0) + 1,
        },
      },
    })),
  removeItem: (itemId) =>
    set((state) => {
      const newItems = { ...state.items };
      delete newItems[itemId];
      return { items: newItems };
    }),
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      items: {
        ...state.items,
        [itemId]: {
          ...state.items[itemId],
          quantity: state.items[itemId].quantity + quantity,
        },
      },
    })),
  clearCart: () => set({ items: {} }),
}));
