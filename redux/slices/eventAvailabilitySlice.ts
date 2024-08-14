import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { AvailabilityState } from "@/types/types";

const initialState: AvailabilityState = {
  availableDays: [],
  loading: false,
  error: null,
};

export const fetchEventAvailability = createAsyncThunk(
  "availability/fetchEventAvailability",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/event-availability");

      return response?.data?.availability?.days;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch availability";
      toast.error("Something went wrong!");
      return rejectWithValue(errorMessage);
    }
  }
);

const eventAvailabilitySlice = createSlice({
  name: "availability",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availableDays = action.payload || [];
      })
      .addCase(fetchEventAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default eventAvailabilitySlice.reducer;
