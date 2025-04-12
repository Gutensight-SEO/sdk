import { createSlice } from "@reduxjs/toolkit";
import { getHome } from "./actions.home.ts";

interface HomeSlice {
  analytics: {
    totalRequests: number;
    activeSubscriptions: number;
    remainingCalls: number;
  };
  status: string;
  message: string;
  success: boolean;
  error: boolean;
}

const initialState: HomeSlice = {
  analytics: {
    totalRequests: 0,
    activeSubscriptions: 0,
    remainingCalls: 0
  },
  status: "idle",
  message: "",
  success: false,
  error: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHome.pending, (state) => {
        state.status = "loading";
        state.message = "";
        state.success = false;
        state.error = false;
      })
      .addCase(getHome.fulfilled, (state, action) => {
        state.analytics = action.payload.data;
        state.status = "idle";
        state.message = action.payload.message;
        state.success = true;
        state.error = false;
      })
      .addCase(getHome.rejected, (state, action: any) => {
        state.status = "idle";
        state.message = action.payload.message;
        state.success = false;
        state.error = true;
      });
  },
});

export default homeSlice.reducer;
