/** Single source of every route path in the app. */
export const ROUTES = {
  home: '/',
  login: '/login',
  products: '/products',
  users: '/users',
  notFound: '*',
} as const

export const DEFAULT_PRIVATE_ROUTE = ROUTES.products
