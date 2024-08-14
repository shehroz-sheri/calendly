import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { IcsDownloadState } from "@/types/types";

const initialState: IcsDownloadState = {
  loading: false,
  error: null,
};

export const downloadIcsFile = createAsyncThunk(
  "icsDownload/download",
  async (
    eventDetails: {
      title: string;
      description: string;
      location: string;
      startDateTime: string;
      endDateTime: string;
      timeZone: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "/api/ics",
        { eventDetails },
        { responseType: "blob" }
      );

      return response?.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Error downloading ICS file."
      );
    }
  }
);

const icsDownloadSlice = createSlice({
  name: "icsDownload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(downloadIcsFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadIcsFile.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(downloadIcsFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error downloading ICS file.";
      });
  },
});

export const selectIcsDownloadLoading = (state: RootState) =>
  state.icsDownload.loading;
export const selectIcsDownloadError = (state: RootState) =>
  state.icsDownload.error;

export default icsDownloadSlice.reducer;
