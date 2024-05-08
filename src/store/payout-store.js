import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePayoutStore = create(
  persist(
    (set, get) => ({
      payouts: [],
      addPayout: (payout) => {
        set((state) => ({
          payouts: payout,
        }));
      },
      removePayouts: (address) => {
        set((state) => ({
          payouts: state.payouts.filter((payout) => payout.address !== address),
        }));
      },
      clearPayouts: () => set({ payouts: [] }),
    }),
    {
      name: "payout-storage",
      getStorage: () => createJSONStorage(() => localStorage),
    }
  )
);
