import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectSessionUser } from "./sessionSlice";
import axios from "axios";
import { FetchAvailabilityState } from "@/types/types";


const initialState: FetchAvailabilityState = {
  availability: null,
  loading: false,
  error: null,
};

export const fetchAvailability = createAsyncThunk(
  "fetchAvailability/fetchAvailability",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const user = selectSessionUser(state);

      if (!user) {
        return rejectWithValue("User is not authenticated");
      }

      const response = await axios.post("/api/event-availability", {
        email: user.email,
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch availability");
      }

      return response.data.availability;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Unknown error"
      );
    }
  }
);

const fetchAvailabilitySlice = createSlice({
  name: "fetchAvailability",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailability.fulfilled, (state, action) => {
        state.availability = action.payload;
        state.loading = false;
      })
      .addCase(fetchAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default fetchAvailabilitySlice.reducer;
