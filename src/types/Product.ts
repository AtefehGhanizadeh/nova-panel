export interface ProductRating {
  rate: number
  count: number
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: ProductRating
}

export type ProductCreatePayload = Omit<Product, 'id' | 'rating'>

export interface ProductCreateResponse extends Partial<ProductCreatePayload> {
  id: number
}

export interface ProductFormValues {
  title: string
  description: string
  price: number | ''
  category: string
  image: string
}
