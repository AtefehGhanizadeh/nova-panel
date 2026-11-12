/**
 * Case-insensitive, client-side search. An item matches when any of the
 * strings returned by `getSearchableText` contains the trimmed query.
 */
export function filterBySearch<T>(
  items: readonly T[],
  query: string,
  getSearchableText: (item: T) => readonly string[],
): T[] {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  if (!normalizedQuery) return [...items]

  return items.filter((item) =>
    getSearchableText(item).some((text) => text.toLocaleLowerCase().includes(normalizedQuery)),
  )
}
