import { toFormatted } from './lib'

/**
 * Patch the toFormatted method to date instance.
 */
export function patchInstance(instance: Date) {
  Object.defineProperty(instance, 'toFormatted', toFormatted)
  return instance
}

/**
 * Patch the toFormatted method to global Date prototype.
 */
export function patch() {
  Date.prototype.toFormatted = toFormatted
}

declare global {
  interface Date {
    toFormatted(format: string): string
  }
}
