import { createAction, createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '@/Redux/createAppAsyncThunk'
import type { AppThunk } from '@/Redux/store'
import { tokenStorage } from '@/Storage/tokenStorage'
import type { ApiError } from '@/types/ApiError'
import type { AuthSession, LoginRequest } from '@/types/Auth'
import { RequestStatus } from '@/types/Enums/RequestStatus'
import { handleApiError } from '@/Utils/api/handleApiError'
import { authService } from '@/Utils/services/authService'

export interface AuthState {
  token: string | null
  username: string | null
  status: RequestStatus
  error: ApiError | null
}

const storedSession = tokenStorage.getSession()

const initialState: AuthState = {
  token: storedSession?.token ?? null,
  username: storedSession?.username ?? null,
  status: RequestStatus.Idle,
  error: null,
}

export const loggedOut = createAction('auth/loggedOut')

export const login = createAppAsyncThunk<AuthSession, LoginRequest>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { token } = await authService.login(credentials)
      const session: AuthSession = { token, username: credentials.username.trim() }
      tokenStorage.setSession(session)
      return session
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)

export const logout = (): AppThunk => (dispatch) => {
  tokenStorage.clearSession()
  dispatch(loggedOut())
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = RequestStatus.Loading
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded
        state.token = action.payload.token
        state.username = action.payload.username
      })
      .addCase(login.rejected, (state, action) => {
        state.status = RequestStatus.Failed
        state.error = action.payload ?? handleApiError(action.error)
      })
      .addCase(loggedOut, () => ({ ...initialState, token: null, username: null }))
  },
})

export default authSlice.reducer
