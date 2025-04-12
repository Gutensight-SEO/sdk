import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "./actions.profile.ts";


interface ProfileSlice {
  profile: any | null;
  status: string;
  message: string;
  success: boolean;
  error: boolean;
}

// Initial State
const initialState: ProfileSlice = {
  profile: null,
  status: "idle",
  message: "",
  success: false,
  error: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.profile = null;
        state.status = "loading";
        state.message = "";
        state.success = false;
        state.error = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        console.log("getProfile.fulfilled:", action.payload);
        state.profile = action.payload.data; // Updated to match the correct data structure
        state.status = "idle";
        state.message = action.payload.message;
        state.success = true;
        state.error = false;
      })
      .addCase(getProfile.rejected, (state, action: any) => {
        state.profile = null;
        state.status = "idle";
        state.message = action.payload.message;
        state.success = false;
        state.error = true;
      });
  },
});

export default profileSlice.reducer;
