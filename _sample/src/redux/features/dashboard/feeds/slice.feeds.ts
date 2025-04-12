import { createSlice } from "@reduxjs/toolkit";
import { getFeeds } from "./actions.feeds.ts";


interface FeedSlice {
  feeds: [];
  feed: any;
  status: string;
  message: string;
  success: boolean;
  error: boolean;
}
// Initial State
const initialState: FeedSlice = {
  feeds: [],
  feed: "",
  status: "idle",
  message: "",
  success: false,
  error: false
};

const FeedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get Feeds
      .addCase(getFeeds.pending, (state) => {
        state.status = "loading";
        state.message = "";
        state.success = false;
        state.error = false;
        state.feeds = [];
        // state.feed = "";
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.status = "idle";
        state.message = action.payload.message;
        state.success = true;
        state.error = false;
        state.feeds = action.payload.Feeds;
        // state.feed = "";
      })
      .addCase(getFeeds.rejected, (state, action: any) => {
        state.status = "idle";
        state.message = action.payload.message;
        state.success = false;
        state.error = true;
        state.feeds = [];
        // state.feed = "";
      });
      // get/read Feed
      // update Feed 
      // delete Feed
      // mark Feed as read
  },
});

export default FeedSlice.reducer;
