import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { selectSessionUser } from './sessionSlice';
import axios from 'axios';
import { AnalyticsState } from '@/types/types';
import { VisitStats } from '@/types/types';


const initialState: AnalyticsState = {
  visitData: {},
  peakHoursData: {},
  loading: false,
  error: null,
};

export const fetchAnalytics = createAsyncThunk(
  'analytics/fetchAnalytics',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const user = selectSessionUser(state);

      if (!user) {
        return rejectWithValue('User is not authenticated');
      }

      const response = await axios.post('/api/event-stats', {
        hostId: user.id,
      });

      return response.data.visitStats;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action: PayloadAction<{ [key: string]: VisitStats }>) => {
        const visitStats = action.payload;

        state.visitData = Object.keys(visitStats).reduce((acc, eventId) => {
          acc[eventId] = visitStats[eventId].visitCount;
          return acc;
        }, {} as { [key: string]: number });

        state.peakHoursData = Object.keys(visitStats).reduce((acc, eventId) => {
          const peakHours = visitStats[eventId].peakHours;
          Object.keys(peakHours).forEach((hour) => {
            acc[hour] = (acc[hour] || 0) + peakHours[hour];
          });
          return acc;
        }, {} as { [key: string]: number });

        state.loading = false;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default analyticsSlice.reducer;
