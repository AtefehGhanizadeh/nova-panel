import { number, object, string } from 'yup'
import type { Dictionary } from '@/Dictionary'

const TITLE_MIN = 3
const TITLE_MAX = 100
const DESCRIPTION_MIN = 10
const DESCRIPTION_MAX = 500
const PRICE_MAX = 1_000_000
const HTTP_URL_PATTERN = /^https?:\/\//i

function hasAtMostTwoDecimals(value: number): boolean {
  const cents = value * 100
  return Math.abs(cents - Math.round(cents)) < 1e-6
}

export function createProductSchema(
  messages: Dictionary['validation'],
  categories: readonly string[],
) {
  return object({
    title: string()
      .trim()
      .required(messages.required)
      .min(TITLE_MIN, messages.minLength(TITLE_MIN))
      .max(TITLE_MAX, messages.maxLength(TITLE_MAX)),
    description: string()
      .trim()
      .required(messages.required)
      .min(DESCRIPTION_MIN, messages.minLength(DESCRIPTION_MIN))
      .max(DESCRIPTION_MAX, messages.maxLength(DESCRIPTION_MAX)),
    price: number()
      .transform((value: number, originalValue: unknown) =>
        originalValue === '' ? undefined : value,
      )
      .typeError(messages.number)
      .required(messages.required)
      .positive(messages.positive)
      .max(PRICE_MAX, messages.maxPrice(PRICE_MAX))
      .test('max-two-decimals', messages.decimals, (value) =>
        value === undefined ? true : hasAtMostTwoDecimals(value),
      ),
    category: string().required(messages.required).oneOf(categories, messages.category),
    image: string()
      .trim()
      .required(messages.required)
      .url(messages.url)
      .matches(HTTP_URL_PATTERN, messages.url),
  })
}
