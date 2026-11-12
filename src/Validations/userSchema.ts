import { object, string } from 'yup'
import type { Dictionary } from '@/Dictionary'

const NAME_MIN = 2
const NAME_MAX = 50
const USERNAME_MIN = 3
const USERNAME_MAX = 30
const PASSWORD_MIN = 6
const PHONE_MIN = 7
const PHONE_MAX = 20

const NAME_PATTERN = /^[A-Za-zء-يپچژکگی‌ ]+$/
const USERNAME_PATTERN = /^[A-Za-z0-9_]+$/
const PHONE_PATTERN = /^\+?\d[\d\s-]*\d$/

export function createUserSchema(messages: Dictionary['validation']) {
  const nameField = () =>
    string()
      .trim()
      .required(messages.required)
      .min(NAME_MIN, messages.minLength(NAME_MIN))
      .max(NAME_MAX, messages.maxLength(NAME_MAX))
      .matches(NAME_PATTERN, messages.lettersOnly)

  return object({
    firstName: nameField(),
    lastName: nameField(),
    username: string()
      .trim()
      .required(messages.required)
      .min(USERNAME_MIN, messages.minLength(USERNAME_MIN))
      .max(USERNAME_MAX, messages.maxLength(USERNAME_MAX))
      .matches(USERNAME_PATTERN, messages.username),
    email: string().trim().required(messages.required).email(messages.email),
    password: string()
      .required(messages.required)
      .min(PASSWORD_MIN, messages.minLength(PASSWORD_MIN)),
    phone: string()
      .trim()
      .required(messages.required)
      .min(PHONE_MIN, messages.phone)
      .max(PHONE_MAX, messages.phone)
      .matches(PHONE_PATTERN, messages.phone),
  })
}
