import { getSubscriptionDetails, getSubscriptionPlans, getUserSubscriptions } from "./actions.subscription.ts";
import { createSlice } from "@reduxjs/toolkit";

interface SubscriptionSlice {
  plans: any[];
  userSubscriptions: any[];
  selectedSubscription: any;
  status: 'idle' | 'loading' | 'failed';
  message: string;
  error: boolean;
}

const initialState: SubscriptionSlice = {
  plans: [],
  userSubscriptions: [],
  selectedSubscription: null,
  status: 'idle',
  message: '',
  error: false
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptionPlans.pending, (state) => {
        state.status = 'loading';
        state.message = '';
        state.error = false;
      })
      .addCase(getSubscriptionPlans.fulfilled, (state, action) => {
        state.status = 'idle';
        // Fix: Access the correct nesting level of data
        state.plans = action.payload.data.data;
        state.message = action.payload.message;
        state.error = false;
      })
      .addCase(getSubscriptionPlans.rejected, (state, action: any) => {
        state.status = 'failed';
        state.message = action.payload?.message || 'Failed to fetch subscription plans';
        state.error = true;
        // Clear plans on error
        state.plans = [];
      })
      .addCase(getUserSubscriptions.pending, (state) => {
        state.status = 'loading';
        state.message = '';
        state.error = false;
      })
      .addCase(getUserSubscriptions.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userSubscriptions = action.payload.data;
        state.message = action.payload.message;
        state.error = false;
      })
      .addCase(getUserSubscriptions.rejected, (state, action: any) => {
        state.status = 'failed';
        state.message = action.payload?.message || 'Failed to fetch user subscriptions';
        state.error = true;
        state.userSubscriptions = [];
      })
      .addCase(getSubscriptionDetails.pending, (state) => {
        state.status = 'loading';
        state.message = '';
        state.error = false;
      })
      .addCase(getSubscriptionDetails.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedSubscription = action.payload.data;
        state.message = action.payload.message;
        state.error = false;
      })
      .addCase(getSubscriptionDetails.rejected, (state, action: any) => {
        state.status = 'failed';
        state.message = action.payload?.message || 'Failed to fetch subscription details';
        state.error = true;
        state.selectedSubscription = null;
      });
  },
});

export default subscriptionSlice.reducer;
