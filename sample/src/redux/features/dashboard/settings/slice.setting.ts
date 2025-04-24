import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "./actions.setting";


interface settingSlice {
  setting: {
    profile: any | null;
  } | null;
  status: string;
  message: string;
  success: boolean;
  error: boolean;
}

// Initial State
const initialState: settingSlice = {
  setting: {
    profile: null
  },
  status: "idle",
  message: "",
  success: false,
  error: false,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        if (state.setting) {
          state.setting.profile = null;
        }
        state.status = "loading";
        state.message = "";
        state.success = false;
        state.error = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log("updateProfile.fulfilled:", action.payload);
        if (state.setting) {
          state.setting.profile = action.payload.profile;
        }
        state.status = "idle";
        state.message = action.payload.message;
        state.success = true;
        state.error = false;
      })
      .addCase(updateProfile.rejected, (state, action: any) => {
        if (state.setting) {
          state.setting.profile = null;
        }
        state.status = "idle";
        state.message = action.payload.message;
        state.success = false;
        state.error = true;
      });
  },
});

export default settingSlice.reducer;
