import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { ForgotPasswordState } from "@/types/types";


const initialState: ForgotPasswordState = {
  loading: false,
  error: null,
};

export const forgotPassword = createAsyncThunk(
  "forgotPassword/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/forgot-password", { email });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectForgotPasswordLoading = (state: RootState) =>
  state.forgotPassword.loading;
export const selectForgotPasswordError = (state: RootState) =>
  state.forgotPassword.error;

export default forgotPasswordSlice.reducer;
