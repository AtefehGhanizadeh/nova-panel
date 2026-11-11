/** Type guard that checks a raw value (from storage or the API) against a string enum. */
export function isEnumValue<T extends Record<string, string>>(
  enumObject: T,
  value: unknown,
): value is T[keyof T] {
  return typeof value === 'string' && Object.values<string>(enumObject).includes(value)
}
