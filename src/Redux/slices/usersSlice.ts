import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '@/Redux/createAppAsyncThunk'
import { loggedOut } from '@/Redux/slices/authSlice'
import type { ApiError } from '@/types/ApiError'
import { RequestStatus } from '@/types/Enums/RequestStatus'
import type { User, UserFormValues } from '@/types/User'
import { handleApiError } from '@/Utils/api/handleApiError'
import { withUniqueId } from '@/Utils/getNextLocalId'
import { toUserCreatePayload, userService } from '@/Utils/services/userService'

export interface UsersState {
  items: User[]
  listStatus: RequestStatus
  listError: ApiError | null
  createStatus: RequestStatus
  createError: ApiError | null
}

const initialState: UsersState = {
  items: [],
  listStatus: RequestStatus.Idle,
  listError: null,
  createStatus: RequestStatus.Idle,
  createError: null,
}

export const fetchUsers = createAppAsyncThunk<User[]>(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getUsers()
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
  {

    condition: (_, { getState }) => {
      const { listStatus } = getState().users
      return listStatus === RequestStatus.Idle || listStatus === RequestStatus.Failed
    },
  },
)

export const createUser = createAppAsyncThunk<User, UserFormValues>(
  'users/create',
  async (values, { rejectWithValue }) => {
    try {
      
      return await userService.createUser(toUserCreatePayload(values))
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetCreateUserState(state) {
      state.createStatus = RequestStatus.Idle
      state.createError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.listStatus = RequestStatus.Loading
        state.listError = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.listStatus = RequestStatus.Succeeded
        state.items = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.listStatus = RequestStatus.Failed
        state.listError = action.payload ?? handleApiError(action.error)
      })
      .addCase(createUser.pending, (state) => {
        state.createStatus = RequestStatus.Loading
        state.createError = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createStatus = RequestStatus.Succeeded
        state.items.unshift(withUniqueId(action.payload, state.items))
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createStatus = RequestStatus.Failed
        state.createError = action.payload ?? handleApiError(action.error)
      })
      .addCase(loggedOut, () => initialState)
  },
})

export const { resetCreateUserState } = usersSlice.actions
export default usersSlice.reducer
