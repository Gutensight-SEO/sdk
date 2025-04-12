import { createSlice } from "@reduxjs/toolkit";
import { getMessages } from "./actions.messages.ts";


interface MessageSlice {
  userMessages: [];
  userMessage: any;
  status: string;
  message: string;
  success: boolean;
  error: boolean;
}
// Initial State
const initialState: MessageSlice = {
  userMessages: [],
  userMessage: "",
  status: "idle",
  message: "",
  success: false,
  error: false
};

const messagesSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get messages
      .addCase(getMessages.pending, (state) => {
        state.status = "loading";
        state.message = "";
        state.success = false;
        state.error = false;
        state.userMessages = [];
        // state.userMessage = "";
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.status = "idle";
        state.message = action.payload.message;
        state.success = true;
        state.error = false;
        state.userMessages = action.payload.messages;
        // state.userMessage = "";
      })
      .addCase(getMessages.rejected, (state, action: any) => {
        state.status = "idle";
        state.message = action.payload.message;
        state.success = false;
        state.error = true;
        state.userMessages = [];
        // state.userMessage = "";
      });
      // delete messages
      // get/read message
      // update message 
      // delete message
      // mark message as read
  },
});

export default messagesSlice.reducer;
