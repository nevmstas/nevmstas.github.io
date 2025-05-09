import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(text: string) {
  if (!text) return '';
  return text[0].toUpperCase() + text.slice(1);
}

