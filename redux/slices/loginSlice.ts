import { LoginState } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { signIn } from "next-auth/react";


const initialState: LoginState = {
  loading: false,
  error: null,
  loginSuccess: false,
};

export const userVerification = createAsyncThunk(
  "user/verify",
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user-verification", user);

      return { data: response.data.message, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Something went wrong. Please try again!");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    user: { email: string; password: string; availability: boolean },
    { rejectWithValue }
  ) => {
    try {
      const result = await signIn("credentials", {
        email: user.email,
        password: user.password,
        callbackUrl: user.availability
          ? "/dashboard/availability?login-status=true"
          : "/dashboard",
        redirect: false,
      });

      if (result?.ok && result?.url && !result.error) {
        return result.url;
      } else {
        throw new Error(result && result.error || "Login failed");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.loginSuccess = action.payload.data === "Login Successful";
      })
      .addCase(userVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.loginSuccess = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default loginSlice.reducer;
