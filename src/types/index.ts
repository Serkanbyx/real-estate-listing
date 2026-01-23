/**
 * Real Estate Listing Types
 * Emlak ilanları için tip tanımlamaları
 */

/** Property type options - Emlak türleri */
export type PropertyType = 'apartment' | 'house' | 'villa' | 'land' | 'office' | 'shop';

/** Listing status - İlan durumu */
export type ListingStatus = 'for-sale' | 'for-rent' | 'sold' | 'rented';

/** Listing interface - İlan arayüzü */
export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: PropertyType;
  status: ListingStatus;
  address: {
    street: string;
    city: string;
    district: string;
    postalCode?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  features: {
    rooms: number;
    bathrooms: number;
    area: number; // m²
    floor?: number;
    totalFloors?: number;
    buildingAge?: number;
    heating?: string;
    furnished?: boolean;
    parking?: boolean;
    balcony?: boolean;
    elevator?: boolean;
  };
  images: string[];
  agent: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

/** Filter state interface - Filtre durumu arayüzü */
export interface FilterState {
  search: string;
  city: string;
  type: PropertyType | '';
  status: ListingStatus | '';
  priceMin: number | null;
  priceMax: number | null;
  roomsMin: number | null;
  roomsMax: number | null;
  areaMin: number | null;
  areaMax: number | null;
}

/** Contact form data - İletişim formu verileri */
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  listingId: string;
}

/** API response wrapper - API yanıt sarmalayıcısı */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
