import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '@/Redux/store'
import type { ApiError } from '@/types/ApiError'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: ApiError
}>()
