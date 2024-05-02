import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCart = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addItem: (product) => {
        if (!product || !product.item) {
          return;
        }
        const { item, quantity, color, size } = product;
        set((state) => {
          const isExisting = state.cartItems.find(
            (cartItem) => cartItem.item._id === item._id
          );
          if (isExisting) {
            console.log("Product already exists in the cart.");
            return state;
          }
          return {
            cartItems: [...state.cartItems, { item, quantity, color, size }],
          };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (cartItem) => cartItem.item._id !== id
          ),
        }));
      },
      increaseQuantity: (id) => {
        set((state) => ({
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.item._id === id
              ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
              : cartItem
          ),
        }));
      },
      decreaseQuantity: (id) => {
        set((state) => ({
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.item._id === id && (cartItem.quantity || 1) > 1
              ? { ...cartItem, quantity: (cartItem.quantity || 1) - 1 }
              : cartItem
          ),
        }));
      },
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      getStorage: () => createJSONStorage(() => localStorage),
    }
  )
);
