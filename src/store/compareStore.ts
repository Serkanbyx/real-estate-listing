import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const MAX_COMPARE_ITEMS = 3;

/**
 * Compare store state interface
 * Karşılaştırma store durumu arayüzü
 */
interface CompareState {
  // State
  compareIds: string[];

  // Actions
  addToCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  toggleCompare: (id: string) => boolean;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  canAddMore: () => boolean;
}

/**
 * Zustand store for property comparison with localStorage persistence
 * localStorage kalıcılığı ile mülk karşılaştırma için Zustand store
 */
export const useCompareStore = create<CompareState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        compareIds: [],

        // Add a listing to compare (returns false if max reached)
        addToCompare: (id) => {
          const { compareIds } = get();
          if (compareIds.length >= MAX_COMPARE_ITEMS) {
            return false;
          }
          if (compareIds.includes(id)) {
            return true;
          }
          set(
            { compareIds: [...compareIds, id] },
            false,
            'addToCompare'
          );
          return true;
        },

        // Remove a listing from compare
        removeFromCompare: (id) => {
          set(
            (state) => ({
              compareIds: state.compareIds.filter((compareId) => compareId !== id),
            }),
            false,
            'removeFromCompare'
          );
        },

        // Toggle compare status (returns false if max reached and was adding)
        toggleCompare: (id) => {
          const { isInCompare, addToCompare, removeFromCompare } = get();
          if (isInCompare(id)) {
            removeFromCompare(id);
            return true;
          }
          return addToCompare(id);
        },

        // Check if a listing is in compare list
        isInCompare: (id) => {
          return get().compareIds.includes(id);
        },

        // Clear all compare items
        clearCompare: () => {
          set({ compareIds: [] }, false, 'clearCompare');
        },

        // Check if can add more items
        canAddMore: () => {
          return get().compareIds.length < MAX_COMPARE_ITEMS;
        },
      }),
      {
        name: 'uk-estates-compare',
      }
    ),
    { name: 'compare-store' }
  )
);

export const MAX_COMPARE = MAX_COMPARE_ITEMS;
