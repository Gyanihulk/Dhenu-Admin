import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import donationService from "./donationService";

// Thunks for fetching donation data
export const getMonthlyDonations = createAsyncThunk(
  "donations/getMonthlyDonations",
  async (_, thunkAPI) => {
    try {
      return await donationService.getMonthlyDonations();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getYearlyDonations = createAsyncThunk(
  "donations/getYearlyDonations",
  async (_, thunkAPI) => {
    try {
      return await donationService.getYearlyDonations();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getRecentDonations = createAsyncThunk(
  "donations/getRecentDonations",
  async (_, thunkAPI) => {
    try {
      return await donationService.getRecentDonations();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  monthlyData: [],
  yearlyData: [],
  recent: [],
  isLoading: false,
  isError: false,
  message: "",
};

// Slice
const donationSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMonthlyDonations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyDonations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.monthlyData = action.payload;
      })
      .addCase(getMonthlyDonations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getYearlyDonations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyDonations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.yearlyData = action.payload;
      })
      .addCase(getYearlyDonations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRecentDonations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecentDonations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.recent = action.payload;
      })
      .addCase(getRecentDonations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default donationSlice.reducer;
