import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SessionState, SessionUser } from "@/types/types";


const initialState: SessionState = {
  user: null,
  isAuthenticated: false,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SessionUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = sessionSlice.actions;

export const selectSessionUser = (state: RootState) => state.session.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.session.isAuthenticated;

export default sessionSlice.reducer;
