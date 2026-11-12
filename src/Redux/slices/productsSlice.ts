import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '@/Redux/createAppAsyncThunk'
import { loggedOut } from '@/Redux/slices/authSlice'
import type { ApiError } from '@/types/ApiError'
import { RequestStatus } from '@/types/Enums/RequestStatus'
import type { Product, ProductFormValues } from '@/types/Product'
import { handleApiError } from '@/Utils/api/handleApiError'
import { withUniqueId } from '@/Utils/getNextLocalId'
import { productService, toProductCreatePayload } from '@/Utils/services/productService'

export interface ProductsState {
  items: Product[]
  categories: string[]
  listStatus: RequestStatus
  listError: ApiError | null
  categoriesStatus: RequestStatus
  createStatus: RequestStatus
  createError: ApiError | null
}

const initialState: ProductsState = {
  items: [],
  categories: [],
  listStatus: RequestStatus.Idle,
  listError: null,
  categoriesStatus: RequestStatus.Idle,
  createStatus: RequestStatus.Idle,
  createError: null,
}

const shouldFetch = (status: RequestStatus) =>
  status === RequestStatus.Idle || status === RequestStatus.Failed

export const fetchProducts = createAppAsyncThunk<Product[]>(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await productService.getProducts()
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
  {
    condition: (_, { getState }) => shouldFetch(getState().products.listStatus),
  },
)

export const fetchCategories = createAppAsyncThunk<string[]>(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await productService.getCategories()
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
  { condition: (_, { getState }) => shouldFetch(getState().products.categoriesStatus) },
)

export const createProduct = createAppAsyncThunk<Product, ProductFormValues>(
  'products/create',
  async (values, { rejectWithValue }) => {
    try {
      return await productService.createProduct(toProductCreatePayload(values))
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetCreateProductState(state) {
      state.createStatus = RequestStatus.Idle
      state.createError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.listStatus = RequestStatus.Loading
        state.listError = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.listStatus = RequestStatus.Succeeded
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.listStatus = RequestStatus.Failed
        state.listError = action.payload ?? handleApiError(action.error)
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = RequestStatus.Loading
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = RequestStatus.Succeeded
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesStatus = RequestStatus.Failed
      })
      .addCase(createProduct.pending, (state) => {
        state.createStatus = RequestStatus.Loading
        state.createError = null
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createStatus = RequestStatus.Succeeded
        state.items.unshift(withUniqueId(action.payload, state.items))
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createStatus = RequestStatus.Failed
        state.createError = action.payload ?? handleApiError(action.error)
      })
      .addCase(loggedOut, () => initialState)
  },
})

export const { resetCreateProductState } = productsSlice.actions
export default productsSlice.reducer
