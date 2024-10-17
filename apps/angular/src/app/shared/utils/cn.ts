import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

/**
 * Merges multiple class names into a single string.
 * @param inputs The class names to merge.
 * @returns The merged class names.
 */
export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}
