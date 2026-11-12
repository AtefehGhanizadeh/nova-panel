interface WithId {
  id: number
}

/** Next free id for an item that only exists locally (max existing id + 1). */
export function getNextLocalId(items: readonly WithId[]): number {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1
}

/**
 * FakeStoreAPI returns the same fake id for every POST, so a new item may
 * collide with an existing one. Swap in a local id to keep table keys unique.
 */
export function withUniqueId<T extends WithId>(item: T, items: readonly WithId[]): T {
  const isTaken = items.some((existing) => existing.id === item.id)
  return isTaken ? { ...item, id: getNextLocalId(items) } : item
}
