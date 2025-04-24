import API from "@/redux/api/index.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSubscriptionPlans = createAsyncThunk(
  "subscriptionPlan/getPlans",
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching subscription plans...');
      const response = await API.get("/subscription-plan");
      console.log('Response:', response.data);

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message,
          data: response.data.data
        };
      }

      return rejectWithValue({
        message: response.data.message || "Failed to fetch subscription plans",
        success: false
      });
    } catch (error: any) {
      console.error('Subscription plans fetch error:', error.response?.data);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch subscription plans",
        success: false
      });
    }
  }
);

export const getUserSubscriptions = createAsyncThunk(
  "subscription/getUserSubscriptions",
  async (activeOnly: boolean = false, { rejectWithValue }) => {
    try {
      console.log('Fetching user subscriptions...');
      const response = await API.get(`/subscription/user-subscriptions${activeOnly ? '?active=true' : ''}`);
      console.log('User subscriptions response:', response.data);

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message,
          data: response.data.data || []
        };
      }

      return rejectWithValue({
        message: response.data.message || "Failed to fetch subscriptions",
        success: false
      });
    } catch (error: any) {
      console.error('User subscriptions fetch error:', error.response?.data);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch subscriptions",
        success: false
      });
    }
  }
);


export const getSubscriptionDetails = createAsyncThunk(
    "subscription/getSubscriptionDetails",
    async (subscriptionId, { rejectWithValue }) => {
      try {
        console.log('Fetching selected subscription detailss...');
        const response = await API.get(`/subscription/details/${subscriptionId}`);
        console.log('selected subscription details response:', response.data);
  
        if (response.data.success) {
          return {
            success: true,
            message: response.data.message,
            data: response.data.data || []
          };
        }
  
        return rejectWithValue({
          message: response.data.message || "Failed to fetch subscriptions",
          success: false
        });
      } catch (error: any) {
            console.error('User subscriptions fetch error:', error.response?.data);
            return rejectWithValue({
            message: error.response?.data?.message || "Failed to fetch subscriptions",
            success: false
            });
      }
    }
);
  
