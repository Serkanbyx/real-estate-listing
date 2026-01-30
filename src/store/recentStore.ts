import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const MAX_RECENT_ITEMS = 10;

/**
 * Recent views store state interface
 * Son görüntülenenler store durumu arayüzü
 */
interface RecentState {
  // State
  recentIds: string[];

  // Actions
  addRecentView: (id: string) => void;
  removeRecentView: (id: string) => void;
  clearRecentViews: () => void;
}

/**
 * Zustand store for recent views with localStorage persistence
 * localStorage kalıcılığı ile son görüntülenenler için Zustand store
 */
export const useRecentStore = create<RecentState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        recentIds: [],

        // Add a listing to recent views (moves to front if exists)
        addRecentView: (id) => {
          set(
            (state) => {
              // Remove if already exists to avoid duplicates
              const filtered = state.recentIds.filter((recentId) => recentId !== id);
              // Add to front and limit to MAX_RECENT_ITEMS
              const newRecent = [id, ...filtered].slice(0, MAX_RECENT_ITEMS);
              return { recentIds: newRecent };
            },
            false,
            'addRecentView'
          );
        },

        // Remove a listing from recent views
        removeRecentView: (id) => {
          set(
            (state) => ({
              recentIds: state.recentIds.filter((recentId) => recentId !== id),
            }),
            false,
            'removeRecentView'
          );
        },

        // Clear all recent views
        clearRecentViews: () => {
          set({ recentIds: [] }, false, 'clearRecentViews');
        },
      }),
      {
        name: 'uk-estates-recent',
      }
    ),
    { name: 'recent-store' }
  )
);
