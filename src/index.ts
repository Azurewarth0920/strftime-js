import { toFormatted } from './lib'

export function patchToFormatted(instance: Date) {
  Object.defineProperty(instance, 'toFormatted', toFormatted)
}

declare global {
  interface Date {
    toFormatted(format: string): string
  }
}

export function patchMethod() {
  Date.prototype.toFormatted = toFormatted
}
