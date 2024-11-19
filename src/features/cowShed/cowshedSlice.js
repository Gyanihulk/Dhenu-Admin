import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import cowshedService from "./cowshedService";

export const getCowSheds = createAsyncThunk(
  "cowshed/get-cowsheds",
  async (thunkAPI) => {
    try {
      return await cowshedService.getCowSheds();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCowShed = createAsyncThunk(
  "cowshed/get-cowshed",
  async (id, thunkAPI) => {
    try {
      return await cowshedService.getCowShed(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCowShed = createAsyncThunk(
  "cowshed/create-cowshed",
  async (cowshedData, thunkAPI) => {
    try {
      return await cowshedService.createCowShed(cowshedData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCowShed = createAsyncThunk(
  "cowshed/update-cowshed",
  async (cowshedData, thunkAPI) => {
    try {
      return await cowshedService.updateCowShed(cowshedData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCowShed = createAsyncThunk(
  "cowshed/delete-cowshed",
  async (id, thunkAPI) => {
    try {
      return await cowshedService.deleteCowShed(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("cowshed/resetState");

const initialState = {
  cowSheds: [],
  cowShedData: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const cowshedSlice = createSlice({
  name: "cowsheds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCowSheds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCowSheds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cowSheds = action.payload;
      })
      .addCase(getCowSheds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(createCowShed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCowShed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCowShed = action.payload;
      })
      .addCase(createCowShed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(getCowShed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCowShed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cowShedData = action.payload;
      })
      .addCase(getCowShed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(updateCowShed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCowShed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCowShed = action.payload;
      })
      .addCase(updateCowShed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(deleteCowShed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCowShed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCowShed = action.payload;
      })
      .addCase(deleteCowShed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default cowshedSlice.reducer;
