import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminDonationService from "./adminDonationService";

export const getUpcomingDonations = createAsyncThunk(
  "adminDonations/upcoming",
  async (_, thunkAPI) => {
    try {
      return await adminDonationService.getUpcomingDonations();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCompletedDonations = createAsyncThunk(
  "adminDonations/completed",
  async (_, thunkAPI) => {
    try {
      return await adminDonationService.getCompletedDonations();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
    upcoming: {
        tomorrow: [],
        next_week: [],
        next_month: [],
      },
  completed: [],
  totalCollected: 0,
  lastWeek: {
    total: 0,
    donations: [],
  },
  lastMonth: {
    total: 0,
    donations: [],
  },
  isLoading: false,
  isError: false,
  message: "",
  metrics: {
    total_donations: 0,
    total_cow_sheds: 0,
    total_cows: 0,
    cows_helped: 0,
    total_users: 0,
  }
};
export const getMetrics = createAsyncThunk(
    "adminDonations/metrics",
    async (_, thunkAPI) => {
      try {
        return await adminDonationService.getMetrics();
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message || "Failed to fetch metrics");
      }
    }
  );
  
const adminDonationSlice = createSlice({
  name: "adminDonations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Upcoming Donations
      .addCase(getUpcomingDonations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUpcomingDonations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }).addCase(getUpcomingDonations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.upcoming = {
          tomorrow: action.payload.tomorrow || [],
          next_week: action.payload.next_week || [],
          next_month: action.payload.next_month || [],
        };
      }).addCase(getMetrics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMetrics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.metrics = {
          total_donations: action.payload.total_donations,
          total_cow_sheds: action.payload.total_cow_sheds,
          total_cows: action.payload.total_cows,
          cows_helped: action.payload.cows_helped,
          total_users: action.payload.total_users,
        };
      })
      .addCase(getMetrics.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Completed Donations
      .addCase(getCompletedDonations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompletedDonations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.completed = action.payload.completed_donations;
        state.totalCollected = action.payload.total_amount_collected;
        state.lastWeek = action.payload.last_week;
        state.lastMonth = action.payload.last_month;
      })
      .addCase(getCompletedDonations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default adminDonationSlice.reducer;
