import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => {
        set((state) => ({
          orders: order,
        }));
      },
      removeOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== orderId),
        }));
      },
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "order-storage",
      getStorage: () => createJSONStorage(() => localStorage),
    }
  )
);
