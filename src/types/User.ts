export interface ApiUserName {
  firstname: string
  lastname: string
}

export interface ApiUser {
  id: number
  username: string
  email: string
  password: string
  phone: string
  name: ApiUserName
}

export interface User {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  phone: string
}

export interface UserCreatePayload {
  username: string
  email: string
  password: string
  phone: string
  name: ApiUserName
}

export interface UserCreateResponse {
  id: number
}

export interface UserFormValues {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  phone: string
}
