import { object, string } from 'yup'
import type { Dictionary } from '@/Dictionary'

export function createLoginSchema(messages: Dictionary['validation']) {
  return object({
    username: string().trim().required(messages.required),
    password: string().required(messages.required),
  })
}
