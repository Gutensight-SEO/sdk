import API from "@/redux/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// get messages
export const getMessages = createAsyncThunk(
  "messages/get",
  async (queryString, { rejectWithValue }) => {
    try {
      console.log("fetching messages...");
      const response = await API.get("/communications/messages/", {
        params: queryString,
      });
      return response.data;
    } catch (error: any) {
      console.log("getMessages error:", error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
