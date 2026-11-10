export { cn } from "cn"

export function formatPrice(priceMinor: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(priceMinor / 100)
}
