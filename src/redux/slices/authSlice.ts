import { User } from "@/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
export interface AuthSlice {
  user: User | null;
  authenticated: boolean;
}

// Define the initial state using that type
const initialState: AuthSlice = {
  user: null,
  authenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    authenticate: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.authenticated = true;
    },
    deAuthenticate: (state) => {
      state.user = null;
      state.authenticated = false;
    },
  },
});

export const { setUser, authenticate, deAuthenticate } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
