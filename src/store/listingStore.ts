import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Listing, FilterState } from '@/types';

/**
 * Initial filter state
 * Başlangıç filtre durumu
 */
const initialFilters: FilterState = {
  search: '',
  city: '',
  type: '',
  status: '',
  priceMin: null,
  priceMax: null,
  roomsMin: null,
  roomsMax: null,
  areaMin: null,
  areaMax: null,
};

/**
 * Listing store state interface
 * Store durumu arayüzü
 */
interface ListingState {
  // State
  listings: Listing[];
  filteredListings: Listing[];
  selectedListing: Listing | null;
  filters: FilterState;
  isLoading: boolean;
  error: string | null;

  // Actions
  setListings: (listings: Listing[]) => void;
  setSelectedListing: (listing: Listing | null) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  applyFilters: () => void;
}

/**
 * Filter listings based on current filters
 * Mevcut filtrelere göre ilanları filtreler
 */
const filterListings = (listings: Listing[], filters: FilterState): Listing[] => {
  return listings.filter((listing) => {
    // Search filter - Arama filtresi
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        listing.title.toLowerCase().includes(searchLower) ||
        listing.description.toLowerCase().includes(searchLower) ||
        listing.address.city.toLowerCase().includes(searchLower) ||
        listing.address.district.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // City filter - Şehir filtresi
    if (filters.city && listing.address.city !== filters.city) {
      return false;
    }

    // Type filter - Tür filtresi
    if (filters.type && listing.type !== filters.type) {
      return false;
    }

    // Status filter - Durum filtresi
    if (filters.status && listing.status !== filters.status) {
      return false;
    }

    // Price range filter - Fiyat aralığı filtresi
    if (filters.priceMin !== null && listing.price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== null && listing.price > filters.priceMax) {
      return false;
    }

    // Rooms range filter - Oda sayısı aralığı filtresi
    if (filters.roomsMin !== null && listing.features.rooms < filters.roomsMin) {
      return false;
    }
    if (filters.roomsMax !== null && listing.features.rooms > filters.roomsMax) {
      return false;
    }

    // Area range filter - Alan aralığı filtresi
    if (filters.areaMin !== null && listing.features.area < filters.areaMin) {
      return false;
    }
    if (filters.areaMax !== null && listing.features.area > filters.areaMax) {
      return false;
    }

    return true;
  });
};

/**
 * Zustand store for listings
 * İlanlar için Zustand store
 */
export const useListingStore = create<ListingState>()(
  devtools(
    (set, get) => ({
      // Initial state
      listings: [],
      filteredListings: [],
      selectedListing: null,
      filters: initialFilters,
      isLoading: false,
      error: null,

      // Actions
      setListings: (listings) => {
        set({ listings }, false, 'setListings');
        get().applyFilters();
      },

      setSelectedListing: (listing) => {
        set({ selectedListing: listing }, false, 'setSelectedListing');
      },

      setFilters: (newFilters) => {
        set(
          (state) => ({
            filters: { ...state.filters, ...newFilters },
          }),
          false,
          'setFilters'
        );
        get().applyFilters();
      },

      resetFilters: () => {
        set({ filters: initialFilters }, false, 'resetFilters');
        get().applyFilters();
      },

      setLoading: (isLoading) => {
        set({ isLoading }, false, 'setLoading');
      },

      setError: (error) => {
        set({ error }, false, 'setError');
      },

      applyFilters: () => {
        const { listings, filters } = get();
        const filteredListings = filterListings(listings, filters);
        set({ filteredListings }, false, 'applyFilters');
      },
    }),
    { name: 'listing-store' }
  )
);

/**
 * Get unique cities from listings
 * İlanlardan benzersiz şehirleri alır
 */
export const getUniqueCities = (listings: Listing[]): string[] => {
  const cities = new Set(listings.map((listing) => listing.address.city));
  return Array.from(cities).sort();
};
