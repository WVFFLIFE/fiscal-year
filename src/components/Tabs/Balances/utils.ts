export function isProductEmpty(
  productName: string | null,
  deficit: number | null
) {
  return !productName && !deficit;
}
