import API from "@/redux/api/index.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getHome = createAsyncThunk(
  "dashboard/home",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/subscription/user-subscriptions?active=true");

      const subscriptions = response.data.data || [];
      return {
        success: true,
        message: response.data.message,
        data: {
          totalRequests: subscriptions.reduce((acc: number, sub: any) => acc + (sub.totalApiRequests || 0), 0),
          activeSubscriptions: subscriptions.length,
          remainingCalls: subscriptions.reduce((acc: number, sub: any) => acc + (sub.remainingApiRequests || 0), 0)
        }
      };
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch dashboard data",
        success: false
      });
    }
  }
);
