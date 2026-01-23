import type { Listing } from '@/types';
import { mockListings } from '@/data/mockListings';

/**
 * API Configuration
 */
const API_CONFIG = {
  // Set to true for mock data, false for real API
  USE_MOCK_DATA: true,
  // Base URL for API requests
  BASE_URL: 'https://api.jsonbin.io/v3/b',
  // JSONBin.io bin ID (for example data)
  BIN_ID: '678e4f6bad19ca34f8f15e16',
  // API Key (optional - not required for public bin)
  API_KEY: '',
};

/**
 * Simulates network delay for mock data
 */
const simulateDelay = (ms: number = 800): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generic fetch wrapper with error handling
 */
async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(API_CONFIG.API_KEY && { 'X-Access-Key': API_CONFIG.API_KEY }),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Transform API response to match our Listing type
 */
function transformApiResponse(data: unknown): Listing[] {
  // JSONBin.io returns data in { record: {...} } format
  if (data && typeof data === 'object' && 'record' in data) {
    const record = (data as { record: { listings?: Listing[] } }).record;
    if (record.listings && Array.isArray(record.listings)) {
      return record.listings;
    }
  }
  
  // Direct array response
  if (Array.isArray(data)) {
    return data as Listing[];
  }
  
  // Fallback to mock data
  console.warn('Unexpected API response format, using mock data');
  return mockListings;
}

/**
 * Listing API Service
 */
export const listingApi = {
  /**
   * Fetch all listings
   */
  async getAll(): Promise<Listing[]> {
    if (API_CONFIG.USE_MOCK_DATA) {
      await simulateDelay();
      return mockListings;
    }

    try {
      const url = `${API_CONFIG.BASE_URL}/${API_CONFIG.BIN_ID}`;
      const data = await fetchWithErrorHandling<unknown>(url);
      return transformApiResponse(data);
    } catch (error) {
      console.error('Failed to fetch listings from API, falling back to mock data:', error);
      return mockListings;
    }
  },

  /**
   * Fetch single listing by ID
   */
  async getById(id: string): Promise<Listing | null> {
    if (API_CONFIG.USE_MOCK_DATA) {
      await simulateDelay(500);
      return mockListings.find((listing) => listing.id === id) || null;
    }

    try {
      const listings = await this.getAll();
      return listings.find((listing) => listing.id === id) || null;
    } catch (error) {
      console.error('Failed to fetch listing:', error);
      return mockListings.find((listing) => listing.id === id) || null;
    }
  },

  /**
   * Search listings with filters
   */
  async search(params: {
    city?: string;
    type?: string;
    status?: string;
    priceMin?: number;
    priceMax?: number;
    roomsMin?: number;
    roomsMax?: number;
  }): Promise<Listing[]> {
    const listings = await this.getAll();
    
    return listings.filter((listing) => {
      if (params.city && listing.address.city !== params.city) return false;
      if (params.type && listing.type !== params.type) return false;
      if (params.status && listing.status !== params.status) return false;
      if (params.priceMin && listing.price < params.priceMin) return false;
      if (params.priceMax && listing.price > params.priceMax) return false;
      if (params.roomsMin && listing.features.rooms < params.roomsMin) return false;
      if (params.roomsMax && listing.features.rooms > params.roomsMax) return false;
      return true;
    });
  },
};

/**
 * Contact API Service (simulated)
 */
export const contactApi = {
  /**
   * Submit contact form
   */
  async submit(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    listingId: string;
  }): Promise<{ success: boolean; message: string }> {
    await simulateDelay(1000);
    
    // Simulate API response
    console.log('Contact form submitted:', data);
    
    return {
      success: true,
      message: 'Your message has been sent successfully!',
    };
  },
};

export default { listingApi, contactApi };
