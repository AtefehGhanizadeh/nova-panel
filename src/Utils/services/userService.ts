import type {
  ApiUser,
  User,
  UserCreatePayload,
  UserCreateResponse,
  UserFormValues,
} from '@/types/User'
import { axiosInstance } from '@/Utils/api/axiosInstance'
import { API_ENDPOINTS } from '@/Utils/api/endpoints'

type ApiUserPublicFields = Pick<ApiUser, 'id' | 'username' | 'email' | 'phone' | 'name'>

function toUser({ id, username, email, phone, name }: ApiUserPublicFields): User {
  return {
    id,
    firstName: name.firstname,
    lastName: name.lastname,
    username,
    email,
    phone,
  }
}

export function toUserCreatePayload(values: UserFormValues): UserCreatePayload {
  return {
    username: values.username.trim(),
    email: values.email.trim(),
    password: values.password,
    phone: values.phone.trim(),
    name: {
      firstname: values.firstName.trim(),
      lastname: values.lastName.trim(),
    },
  }
}

export const userService = {
  async getUsers(): Promise<User[]> {
    const { data } = await axiosInstance.get<ApiUser[]>(API_ENDPOINTS.users)
    return data.map(toUser)
  },

  async createUser(payload: UserCreatePayload): Promise<User> {
    const { data } = await axiosInstance.post<UserCreateResponse>(API_ENDPOINTS.users, payload)
    return toUser({ ...payload, id: data.id })
  },
}
