import API from "@/redux/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// get feeds
export const getFeeds = createAsyncThunk(
  "dashboard/feeds",
  async (queryString, { rejectWithValue }) => {
    try {
      console.log("fetching dashboard feeds...");
      const response = await API.get("/profile/feeds", {
        params: queryString,
      });

      return response.data;
    } catch (error: any) {
      console.log("getFeeds error:", error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
