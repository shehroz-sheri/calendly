import { SignupUser, SignupState } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: SignupState = {
  response: {
    status: null,
    message: null,
  },
  signupLoading: false,
  error: null,
};

export const signupUser = createAsyncThunk(
  "auth/signUpUser",
  async (user: SignupUser, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/signup", user);

      return { status: response.status, message: response.data.message };
    } catch (error: any) {
      // Handle errors based on the structure of the error object
      const errorMessage = error.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.signupLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signupLoading = false;
        state.response.status = action.payload.status;
        state.response.message = action.payload.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default signupSlice.reducer;
