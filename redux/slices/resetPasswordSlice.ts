import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { ResetPasswordState } from '@/types/types';


const initialState: ResetPasswordState = {
  loading: false,
  error: null,
};

export const resetPassword = createAsyncThunk(
  'resetPassword/resetPassword',
  async (
    { token, email, newPassword }: { token: string | null; email: string | null; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/api/reset-password', {
        token,
        email,
        newPassword,
      });

      if (response.status !== 200) {
        return rejectWithValue(response.data.message || 'Something went wrong');
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectResetPasswordLoading = (state: RootState) => state.resetPassword.loading;
export const selectResetPasswordError = (state: RootState) => state.resetPassword.error;

export default resetPasswordSlice.reducer;
