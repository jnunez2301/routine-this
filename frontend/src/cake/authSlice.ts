import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  username: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  username: null,
  isAuthenticated: false,
};
// Backend wise on every request we must use "Authorization: Bearer {token} if we get 401 it means that the user must be logged out"
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: string; token: string }>) => {
      state.username = action.payload.user;
      localStorage.setItem(
        "e3cba8a3a6c4e17f5db6a1c2d4205f0f0e71f5bf6c9db1a2af0b1cbdb824be4e",
        action.payload.token
      );
    },
    logout: (state) => {
      state.username = null;
      localStorage.removeItem(
        "e3cba8a3a6c4e17f5db6a1c2d4205f0f0e71f5bf6c9db1a2af0b1cbdb824be4e"
      );
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
// useSelector(selectAuth) to make usage of this state across the app
export const selectAuth = (state: RootState) => state.auth;
