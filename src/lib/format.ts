/** Formatta un prezzo in formato italiano: 40,00 € */
export function formatPrice(value: number): string {
  return `${value.toFixed(2).replace(".", ",")} €`;
}
