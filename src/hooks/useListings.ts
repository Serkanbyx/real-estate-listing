import { useEffect, useCallback } from 'react';
import { useListingStore } from '@/store/listingStore';
import { listingApi } from '@/services/api';

/**
 * Custom hook for fetching listings from API
 * API'den ilanları çekmek için özel hook
 */
export function useListings() {
  const { 
    listings, 
    filteredListings, 
    isLoading, 
    error, 
    setListings, 
    setLoading, 
    setError 
  } = useListingStore();

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await listingApi.getAll();
      setListings(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'İlanlar yüklenirken bir hata oluştu';
      setError(errorMessage);
      console.error('Failed to fetch listings:', err);
    } finally {
      setLoading(false);
    }
  }, [setListings, setLoading, setError]);

  useEffect(() => {
    // Only fetch if listings are empty
    if (listings.length === 0) {
      fetchListings();
    }
  }, [listings.length, fetchListings]);

  return {
    listings,
    filteredListings,
    isLoading,
    error,
    refetch: fetchListings,
  };
}

/**
 * Custom hook for fetching a single listing by ID
 * ID'ye göre tek ilan çekmek için özel hook
 */
export function useListing(id: string | undefined) {
  const { selectedListing, setSelectedListing, listings, setListings } = useListingStore();

  const fetchListing = useCallback(async () => {
    if (!id) return;

    try {
      // First check if listing exists in current listings
      let listing = listings.find((l) => l.id === id);
      
      if (!listing) {
        // If not found, fetch from API
        listing = await listingApi.getById(id) ?? undefined;
        
        // Also fetch all listings to populate the store
        if (listings.length === 0) {
          const allListings = await listingApi.getAll();
          setListings(allListings);
        }
      }
      
      if (listing) {
        setSelectedListing(listing);
      }
    } catch (err) {
      console.error('Failed to fetch listing:', err);
    }
  }, [id, listings, setListings, setSelectedListing]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  return {
    listing: selectedListing,
    refetch: fetchListing,
  };
}
