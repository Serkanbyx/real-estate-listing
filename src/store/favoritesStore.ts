import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

/**
 * Favorites store state interface
 * Favoriler store durumu arayüzü
 */
interface FavoritesState {
  // State
  favoriteIds: string[];

  // Actions
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

/**
 * Zustand store for favorites with localStorage persistence
 * localStorage kalıcılığı ile favoriler için Zustand store
 */
export const useFavoritesStore = create<FavoritesState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        favoriteIds: [],

        // Add a listing to favorites
        addFavorite: (id) => {
          set(
            (state) => ({
              favoriteIds: state.favoriteIds.includes(id)
                ? state.favoriteIds
                : [...state.favoriteIds, id],
            }),
            false,
            'addFavorite'
          );
        },

        // Remove a listing from favorites
        removeFavorite: (id) => {
          set(
            (state) => ({
              favoriteIds: state.favoriteIds.filter((favId) => favId !== id),
            }),
            false,
            'removeFavorite'
          );
        },

        // Toggle favorite status
        toggleFavorite: (id) => {
          const { isFavorite, addFavorite, removeFavorite } = get();
          if (isFavorite(id)) {
            removeFavorite(id);
          } else {
            addFavorite(id);
          }
        },

        // Check if a listing is favorited
        isFavorite: (id) => {
          return get().favoriteIds.includes(id);
        },

        // Clear all favorites
        clearFavorites: () => {
          set({ favoriteIds: [] }, false, 'clearFavorites');
        },
      }),
      {
        name: 'uk-estates-favorites',
      }
    ),
    { name: 'favorites-store' }
  )
);
