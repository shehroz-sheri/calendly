import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "next-auth/react";
import { RootState } from "../store";
import { GoogleLoginState } from "@/types/types";


const initialState: GoogleLoginState = {
  loading: false,
  error: null,
  loginSuccess: false,
};

export const googleLogin = createAsyncThunk(
  "googleLogin/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (result?.ok && result?.url && !result.error) {
        return result;
      } else {
        throw new Error((result && result.error) || "Login failed");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const googleLoginSlice = createSlice({
  name: "googleLogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state) => {
        state.loading = false;
        state.loginSuccess = true;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectGoogleLoginLoading = (state: RootState) =>
  state.googleLogin.loading;

export default googleLoginSlice.reducer;
