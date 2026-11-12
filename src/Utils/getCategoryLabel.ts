import type { Dictionary } from '@/Dictionary'
import { ProductCategory } from '@/types/Enums/ProductCategory'
import { isEnumValue } from '@/Utils/isEnumValue'

/** Translates a known API category slug; unknown values are shown as they are. */
export function getCategoryLabel(category: string, t: Dictionary): string {
  return isEnumValue(ProductCategory, category) ? t.products.categories[category] : category
}
