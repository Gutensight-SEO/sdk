import { createSlice } from "@reduxjs/toolkit";
import { updateProfile, checkUpdateStatus } from "./actions.updateProfile.ts";

interface UpdateProfileSlice {
  status: 'idle' | 'loading' | 'streaming' | 'success' | 'failed';
  message: string;
  error: boolean;
  streamingUrl: string | null;
  updateComplete: boolean;
  redirectToProfile: boolean;
  currentData: {
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
  } | null;
}

interface UpdateProfileResponse {
  success: boolean;
  message: any;
  data: any;
  streamingUrl?: string;  // Make it optional since it might not always be present
}

const initialState: UpdateProfileSlice = {
  status: 'idle',
  message: '',
  error: false,
  streamingUrl: null,
  updateComplete: false,
  redirectToProfile: false,
  currentData: null
};

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    resetUpdateProfile: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
        state.message = '';
        state.error = false;
        state.streamingUrl = null;
        state.updateComplete = false;
        state.redirectToProfile = false;
      })
      .addCase(updateProfile.fulfilled, (state, action: { payload: UpdateProfileResponse }) => {
        state.status = 'streaming';
        state.message = action.payload.message;
        state.error = false;
        state.streamingUrl = action.payload.streamingUrl || null;
      })
      .addCase(updateProfile.rejected, (state, action: any) => {
        state.status = 'failed';
        state.message = action.payload.message;
        state.error = true;
      })
      .addCase(checkUpdateStatus.fulfilled, (state, action) => {
        if (action.payload.status === 'completed') {
          state.updateComplete = true;
          state.streamingUrl = null;
          state.status = 'idle';
          
          if (action.payload.success) {
            state.error = false;
            state.message = action.payload.message;
            state.redirectToProfile = true;
          } else {
            state.error = true;
            state.message = action.payload.message;
            state.redirectToProfile = false;
          }
        }
      })
      .addCase(checkUpdateStatus.rejected, (state, action: any) => {
        state.status = 'failed';
        state.message = action.payload.message;
        state.error = true;
        state.streamingUrl = null;
        state.updateComplete = true;
        state.redirectToProfile = false;
      });
  },
});

export const { resetUpdateProfile } = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
