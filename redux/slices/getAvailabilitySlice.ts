import { GetAvailabilityState } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: GetAvailabilityState = {
  response: {
    availability: null,
    status: null,
  },
  loading: false,
  error: null,
};

export const fetchAvailability = createAsyncThunk(
  "availability/fetch",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/event-availability", {
        email,
      });

      return {
        availability: response?.data?.availability,
        status: response?.status,
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch availability"
      );
    }
  }
);

const getAvailabilitySlice = createSlice({
  name: "getAvailability",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailability.fulfilled, (state, action) => {
        state.response.availability = action.payload.availability;
        state.response.status = action.payload.status;
        state.loading = false;
      })
      .addCase(fetchAvailability.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default getAvailabilitySlice.reducer;
