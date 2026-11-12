import { configureStore, type ThunkAction, type UnknownAction } from '@reduxjs/toolkit'
import authReducer from '@/Redux/slices/authSlice'
import settingsReducer from '@/Redux/slices/settingsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>
