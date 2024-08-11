import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectSessionUser } from "./sessionSlice";
import axios from "axios";
import { EventsState } from "@/types/types";


const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const user = selectSessionUser(state);

      if (!user) {
        return rejectWithValue("User is not authenticated");
      }

      const response = await axios.post("/api/get-events", {
        userId: user.id,
      });

      return response.data.events;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch events.";
      return rejectWithValue(errorMessage);
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectEvents = (state: RootState) => state.events.events;
export const selectEventsLoading = (state: RootState) => state.events.loading;
export const selectEventsError = (state: RootState) => state.events.error;

export default eventsSlice.reducer;
