import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import burstService from "./burstService";

const initialState = {
  burst: {},
  bursts: [],
  interruptions: [],
  createBurstError: false,
  createBurstSuccess: false,
  getInterruptionsError: false,
  getInterruptionsSuccess: false,
  burstLoading: false,
  burstMessage: "",
};

// Create burst
export const createBurst = createAsyncThunk(
  "burst/create",
  async (burstData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await burstService.createBurst(burstData, token);
    } catch (error) {
      const burstMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(burstMessage);
    }
  }
);

// Get interruptions
export const getInterruptions = createAsyncThunk(
  "burst/getInterruptions",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      return await burstService.getInterruptions(token);
    } catch (error) {
      const burstMessage = error.response.data["detail"];
      return thunkAPI.rejectWithValue(burstMessage);
    }
  }
);

export const burstSlice = createSlice({
  name: "burst",
  initialState,
  reducers: {
    resetBurst: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBurst.pending, (state) => {
        state.burstLoading = true;
        state.createBurstError = false;
        state.createBurstSuccess = false;
        state.getInterruptionsError = false;
        state.getInterruptionsSuccess = false;
        state.burstMessage = "";
      })
      .addCase(createBurst.fulfilled, (state, action) => {
        state.burstLoading = false;
        state.burstSuccess = true;
        state.burst = action.payload;
      })
      .addCase(createBurst.rejected, (state, action) => {
        state.burstLoading = false;
        state.burstError = true;
        state.burstMessage = action.payload;
      })
      .addCase(getInterruptions.pending, (state) => {
        state.burstLoading = true;
        state.burstLoading = true;
        state.createBurstError = false;
        state.createBurstSuccess = false;
        state.getInterruptionsError = false;
        state.getInterruptionsSuccess = false;
        state.burstMessage = "";
      })
      .addCase(getInterruptions.fulfilled, (state, action) => {
        state.burstLoading = false;
        state.burstSuccess = true;
        state.interruptions = action.payload;
      })
      .addCase(getInterruptions.rejected, (state, action) => {
        state.burstLoading = false;
        state.burstError = true;
        state.burstMessage = action.payload;
      });
  },
});

export const { resetBurst } = burstSlice.actions;
export default burstSlice.reducer;
