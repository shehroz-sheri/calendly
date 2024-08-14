import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EventInfo, ScheduleEventState } from "@/types/types";

const initialState: ScheduleEventState = {
  loading: false,
  success: null,
  error: null,
};

export const scheduleEvent = createAsyncThunk(
  "scheduleEvent/scheduleEvent",
  async (
    { eventDetails }: { eventDetails: EventInfo },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/schedule-event", {
        eventDetails,
      });

      if (response?.status !== 201) {
        return rejectWithValue(
          response?.data?.message ||
            "Something went wrong! Please try again later."
        );
      }

      return response?.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to schedule event"
      );
    }
  }
);

const scheduleEventSlice = createSlice({
  name: "scheduleEvent",
  initialState,
  reducers: {
    resetScheduleEventState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(scheduleEvent.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(scheduleEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(scheduleEvent.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetScheduleEventState } = scheduleEventSlice.actions;

export default scheduleEventSlice.reducer;
