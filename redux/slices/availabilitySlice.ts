import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AvailabilitySliceState, SetAvailabilityPayload } from "@/types/types";

const initialState: AvailabilitySliceState = {
  response: {
    status: null,
    message: null,
  },
  loading: false,
  error: null,
};

export const setAvailability = createAsyncThunk(
  "availability/setAvailability",
  async (payload: SetAvailabilityPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/availability", {
        availability: payload?.availability,
      });

      return { status: response?.status, message: response?.data?.message };
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update availability.";
      return rejectWithValue(errorMessage);
    }
  }
);

const availabilitySlice = createSlice({
  name: "availability",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.response.status = action.payload.status;
        state.response.message = action.payload.message;
      })
      .addCase(setAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default availabilitySlice.reducer;
