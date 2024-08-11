import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectSessionUser } from "./sessionSlice";
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
  async (payload: UpdateUserPayload, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const user = selectSessionUser(state);

      if (!user) {
        return rejectWithValue("User is not authenticated");
      }

      const response = await axios.post("/api/update/user", {
        email: user.email,
        data: payload.data,
      });

      return { status: response.status, message: response.data.message };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to update profile";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const user = selectSessionUser(state);

      if (!user) {
        return rejectWithValue("User is not authenticated");
      }

      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return rejectWithValue(
          errorResponse.message || "Failed to delete account"
        );
      }
      const data = await response.json();
      return { status: response.status, message: data.message };
    } catch (error: any) {
      return rejectWithValue(error.message);
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
