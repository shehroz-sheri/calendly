import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { AppointmentDetailsState } from "@/types/types";

const initialState: AppointmentDetailsState = {
  appointment: null,
  loading: false,
  error: null,
  status: null,
};

export const fetchAppointmentDetails = createAsyncThunk(
  "appointmentDetails/fetchAppointmentDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/fetch-event/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return { data: response?.data, status: response?.status };
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred.";
      const status = error?.response?.status || 500;
      return rejectWithValue({ message: errorMessage, status });
    }
  }
);

const appointmentDetailsSlice = createSlice({
  name: "appointmentDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload.data;
        state.status = action.payload.status;
      })
      .addCase(fetchAppointmentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectAppointmentDetails = (state: RootState) =>
  state.appointmentDetails.appointment;
export const selectAppointmentLoading = (state: RootState) =>
  state.appointmentDetails.loading;
export const selectAppointmentError = (state: RootState) =>
  state.appointmentDetails.error;

export default appointmentDetailsSlice.reducer;
