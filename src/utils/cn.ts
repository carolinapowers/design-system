import { clsx, type ClassValue } from 'clsx'

/**
 * Utility function to merge CSS classes
 * Uses clsx for conditional classes and automatic deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}