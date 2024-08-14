import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { EventDetails, ExportEventsState } from "@/types/types";

const initialState: ExportEventsState = {
  loading: false,
  error: null,
  blob: null,
};

export const exportEventsThunk = createAsyncThunk(
  "events/exportEvents",
  async (eventDetails: EventDetails[], { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/group-ics",
        {
          eventDetails,
        },
        {
          responseType: "blob",
        }
      );

      if (response?.status !== 200) {
        throw new Error(response?.statusText || "Failed to download ICS file");
      }

      return response?.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Unknown error"
      );
    }
  }
);

const exportEventsSlice = createSlice({
  name: "exportEvents",
  initialState,
  reducers: {
    resetExportEventsState(state) {
      state.loading = false;
      state.error = null;
      state.blob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(exportEventsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exportEventsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.blob = action.payload;
      })
      .addCase(exportEventsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectExportEventsLoading = (state: RootState) =>
  state.exportEvents.loading;
export const selectExportEventsError = (state: RootState) =>
  state.exportEvents.error;

export default exportEventsSlice.reducer;
