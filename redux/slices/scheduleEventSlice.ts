import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectSessionUser } from "./sessionSlice";
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
    {
      eventDetails,
      refreshToken,
    }: { eventDetails: EventInfo; refreshToken: string | undefined },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const user = selectSessionUser(state);

      if (!user) {
        return rejectWithValue("User is not authenticated");
      }

      const response = await axios.post("/api/schedule-event", {
        user,
        eventDetails,
        refreshToken,
      });

      if (response.status !== 201) {
        return rejectWithValue(
          response.data.message ||
            "Something went wrong! Please try again later."
        );
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to schedule event"
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
