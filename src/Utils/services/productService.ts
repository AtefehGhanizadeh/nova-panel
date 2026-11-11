import type {
  Product,
  ProductCreatePayload,
  ProductCreateResponse,
  ProductFormValues,
} from '@/types/Product'
import { axiosInstance } from '@/Utils/api/axiosInstance'
import { API_ENDPOINTS } from '@/Utils/api/endpoints'

export function toProductCreatePayload(values: ProductFormValues): ProductCreatePayload {
  return {
    title: values.title.trim(),
    description: values.description.trim(),
    price: Number(values.price),
    category: values.category,
    image: values.image.trim(),
  }
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    const { data } = await axiosInstance.get<Product[]>(API_ENDPOINTS.products)
    return data
  },

  async getCategories(): Promise<string[]> {
    const { data } = await axiosInstance.get<string[]>(API_ENDPOINTS.categories)
    return data
  },

  async createProduct(payload: ProductCreatePayload): Promise<Product> {
    const { data } = await axiosInstance.post<ProductCreateResponse>(
      API_ENDPOINTS.products,
      payload,
    )

    return { ...payload, id: data.id }
  },
}
