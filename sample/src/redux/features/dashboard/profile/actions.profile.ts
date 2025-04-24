import API from "@/redux/api/index.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Get user profile with subscriptions
export const getProfile = createAsyncThunk(
  "profile/get",
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching profile data...');
      const [profileResponse, subscriptionsResponse] = await Promise.all([
        API.get("/user/"),
        API.get("/subscription/user-subscriptions")
      ]);

      console.log('Profile Response:', profileResponse.data);
      console.log('Subscriptions Response:', subscriptionsResponse.data);

      if (profileResponse.data.success) {
        return {
          success: true,
          message: "Profile fetched successfully",
          data: {
            user: profileResponse.data.data,
            subscriptions: subscriptionsResponse.data.data || []
          }
        };
      }

      return rejectWithValue({
        message: "Failed to fetch profile data",
        success: false
      });
    } catch (error: any) {
      console.error('Profile fetch error:', error.response?.data);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch profile",
        success: false
      });
    }
  }
);
