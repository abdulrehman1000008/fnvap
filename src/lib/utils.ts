import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function generateProjectId(
  industryType: string,
  plantType: string,
  date: Date
): string {
  const industry = industryType.substring(0, 4).toUpperCase()
  const plant = plantType.substring(0, 4).toUpperCase()
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
  return `${industry}${plant}${dateStr}`
}