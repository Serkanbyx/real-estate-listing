import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency: string = 'TRY'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format area with unit
 */
export function formatArea(area: number): string {
  return `${area.toLocaleString('en-US')} m²`;
}

/**
 * Get property type label
 */
export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    apartment: 'Apartment',
    house: 'House',
    villa: 'Villa',
    land: 'Land',
    office: 'Office',
    shop: 'Shop',
  };
  return labels[type] || type;
}

/**
 * Get listing status label
 */
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    'for-sale': 'For Sale',
    'for-rent': 'For Rent',
    sold: 'Sold',
    rented: 'Rented',
  };
  return labels[status] || status;
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
