import API from "@/redux/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// get notifications
export const getNotifications = createAsyncThunk(
  "notifications/get",
  async (queryString, { rejectWithValue }) => {
    try {
      console.log("fetching notifications...");
      const response = await API.get("/communications/notifications", {
        params: queryString,
      });
      return response.data;
    } catch (error: any) {
      console.log("getNotifications error:", error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
