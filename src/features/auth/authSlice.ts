import { createSlice, PayloadAction } from '@reduxjs/toolkit' // redux toolkit helpers

export type AuthUser = { // minimal auth user shape
  id: string
  name: string
  email: string
}

type AuthState = { // auth slice state
  user: AuthUser | null
}

const initialState: AuthState = { // default auth state
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload // set current user
    },
    clearUser(state) {
      state.user = null // clear user session
    },
  }
})

export const { setUser, clearUser } = authSlice.actions // action creators
export default authSlice.reducer // reducer export
