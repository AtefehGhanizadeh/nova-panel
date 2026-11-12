export function getPageCount(totalItems: number, pageSize: number): number {
  return Math.max(1, Math.ceil(totalItems / pageSize))
}

export function paginate<T>(items: readonly T[], page: number, pageSize: number): T[] {
  const safePage = Math.min(Math.max(1, page), getPageCount(items.length, pageSize))
  const start = (safePage - 1) * pageSize
  return items.slice(start, start + pageSize)
}
