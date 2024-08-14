import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { UpdateUserPayload, UserState } from "@/types/types";

const initialState: UserState = {
  response: {
    status: null,
    message: null,
  },
  updateUserLoading: false,
  deleteUserLoading: false,
  error: null,
};

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload: UpdateUserPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/update/user", {
        data: payload?.data,
      });

      return { status: response?.status, message: response?.data?.message };
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to update profile";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/delete-account");

      if (response?.status !== 200) {
        return rejectWithValue(
          response?.data?.message || "Failed to delete account"
        );
      }

      return { status: response?.status, message: response?.data?.message };
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.updateUserLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserLoading = false;
        state.response.status = action.payload.status;
        state.response.message = action.payload.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserLoading = false;
        state.response.status = null;
        state.response.message = null;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.deleteUserLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserLoading = false;
        state.response.status = action.payload.status;
        state.response.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteUserLoading = false;
        state.response.status = null;
        state.response.message = null;
        state.error = action.payload as string;
      });
  },
});

export const selectUserResponse = (state: RootState) => state.user.response;
export const selectUpdateUserLoading = (state: RootState) =>
  state.user.updateUserLoading;
export const selectDeleteUserLoading = (state: RootState) =>
  state.user.deleteUserLoading;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
