import { createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "./actions.notifications";


interface NotificationSlice {
  notifications: [];
  notification: any;
  status: string;
  message: string;
  success: boolean;
  error: boolean;
}
// Initial State
const initialState: NotificationSlice = {
  notifications: [],
  notification: "",
  status: "idle",
  message: "",
  success: false,
  error: false
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get notifications
      .addCase(getNotifications.pending, (state) => {
        state.status = "loading";
        state.message = "";
        state.success = false;
        state.error = false;
        state.notifications = [];
        // state.notification = "";
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.status = "idle";
        state.message = action.payload.message;
        state.success = true;
        state.error = false;
        state.notifications = action.payload.notifications;
        // state.notification = "";
      })
      .addCase(getNotifications.rejected, (state, action: any) => {
        state.status = "idle";
        state.message = action.payload.message;
        state.success = false;
        state.error = true;
        state.notifications = [];
        // state.notification = "";
      });
      // delete notifications
      // get/read notification
      // update notification 
      // delete notification
      // mark notification as read
  },
});

export default notificationSlice.reducer;
