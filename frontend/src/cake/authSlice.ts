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
export const TOKEN_KEY = "e3cba8a3a6c4e17f5db6a1c2d4205f0f0e71f5bf6c9db1a2af0b1cbdb824be4e";
// Backend wise on every request we must use "Authorization: Bearer {token} if we get 401 it means that the user must be logged out"
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: string; token: string }>) => {
      state.username = action.payload.user;
      localStorage.setItem(TOKEN_KEY,
        action.payload.token
      );
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.username = null;
      localStorage.removeItem(TOKEN_KEY);
      state.isAuthenticated = false;
    },
    profile: (state, action: PayloadAction<{ username: string, isLoggedIn: boolean }>) => {
        state.username = action.payload.username;
        state.isAuthenticated = action.payload.isLoggedIn;
    }
  },
});

export const { login, logout, profile } = authSlice.actions;
export default authSlice.reducer;
// useSelector(selectAuth) to make usage of this state across the app
export const selectAuth = (state: RootState) => state.auth;
