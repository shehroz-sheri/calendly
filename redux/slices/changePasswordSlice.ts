import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { ChangePasswordState } from "@/types/types";

const initialState: ChangePasswordState = {
  loading: false,
  error: null,
  successMessage: null,
  status: null,
};

export const changePassword = createAsyncThunk(
  "changePassword/changePassword",
  async (
    payload: { oldPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/update/change-password", {
        ...payload,
      });

      return { status: response?.status, message: response?.data?.message };
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to change password.";
      return rejectWithValue(errorMessage);
    }
  }
);

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message as string;
        state.status = action.payload.status;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectChangePasswordLoading = (state: RootState) =>
  state.changePassword.loading;
export const selectChangePasswordError = (state: RootState) =>
  state.changePassword.error;
export const selectChangePasswordSuccessMessage = (state: RootState) =>
  state.changePassword.successMessage;

export default changePasswordSlice.reducer;
