import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, register, checkRegistrationStatus, logout } from "./actions.auth.ts";

const checkCookieAuth = () => {
    // console.log("COOKIE:", document.cookie)
  // let token;
  // token = document.cookie.split(';').some(item => item.trim().startsWith('accessToken='))
  // if (!token || token === undefined || token === null) 
  const token = !!localStorage.getItem('accessToken');
  // const token = localStorage.getItem('accessToken');
  // console.log("AUTH SLICE TOKEN:", {token})
  // console.log("ACCESST from LS:", localStorage.getItem('accessToken'))
  // console.log("REFRESHT from LS:", localStorage.getItem('refreshToken'))
  // console.log("ACCESST from LS:", localStorage.removeItem('accessToken'))
  // console.log("ACCESST from LS:", localStorage.removeItem('refreshToken'))

  return token
  // return false
};


interface AuthSlice {
  user: any | null;
  token: boolean;
  isAuthenticated: boolean;
  status: string;
  message: string;
  success: boolean;
  error: boolean;
  streamingUrl: string | null;
  registrationComplete: boolean;
  redirectToLogin: boolean;  // Add this new property
}

// Initial state for the auth
const initialState: AuthSlice = {
  user: null,
  token: false,
  isAuthenticated: checkCookieAuth(), // Check cookie on initial load
  status: "idle",
  message: "",
  success: false,
  error: false,
  streamingUrl: null,
  registrationComplete: false,
  redirectToLogin: false,  // Add this
};

// Load the persisted state from localStorage if available
const persistedStateString = localStorage.getItem("persist: root");
const persistedState = persistedStateString ? JSON.parse(persistedStateString) : null;
const updatedInitialState = {
  ...initialState,
  ...persistedState?.auth, // use persisted state if available
};

const authSlice = createSlice({
  name: "auth",
  initialState: updatedInitialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; accessToken: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    logout: (state) => {
      console.log("LOGGING OUT!!!")
      state.user = null;
      state.token = false;
      state.isAuthenticated = false;
      state.redirectToLogin = true;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.clear();
      // The server will handle cookie removal
      return { payload: null };
    },
    resetAuth: (initialState) => {
      return { ...initialState };
    },
    syncAuthState: (state) => {
      state.isAuthenticated = checkCookieAuth();
      if (!state.isAuthenticated) {
        state.user = null;
        state.token = false;
      }
    },
    clearMessage: (state) => {
      state.message = "";
      state.success = false;
      state.error = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.success = false;
        state.error = false;
        state.message = "";
        state.streamingUrl = null;
        state.registrationComplete = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "streaming";
        state.success = true;
        state.error = false;
        state.message = action.payload.message;
        state.streamingUrl = action.payload.streamingUrl || null;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.status = "idle";
        state.success = false;
        state.error = true;
        state.message = action.payload.message;
      })
      // login
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.success = false;
        state.error = false;
        state.message = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("LOGIN success ACTION", {action})
        state.status = "idle";
        state.success = action.payload.success;
        state.error = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.isAuthenticated = checkCookieAuth(); // Verify cookie exists
        state.token = checkCookieAuth();
      })
      .addCase(login.rejected, (state, action: any) => {
        console.log("LOGIN rejected ACTION", {action})
        state.status = "idle";
        state.success = false;
        state.error = true;
        state.message = action.payload.message;
        state.user = null;
        state.token = false;
        state.isAuthenticated = false;
      })
      .addCase(checkRegistrationStatus.pending, (state) => {
        // Keep streaming state while checking
        if (state.status !== 'streaming') {
          state.status = 'loading';
        }
      })
      .addCase(checkRegistrationStatus.fulfilled, (state, action) => {
        if (action.payload.status === 'completed') {
          state.registrationComplete = true;
          state.streamingUrl = null;
          state.status = "idle";
          
          // Check if registration was successful based on statusCode
          if (action.payload.status === "completed" && action.payload.success) {
            state.success = true;
            state.error = false;
            state.message = action.payload.message || "Registration successful";
            state.redirectToLogin = true;
          } else {
            state.success = false;
            state.error = true;
            state.message = action.payload.errMessage || "Registration failed";
            state.redirectToLogin = false;
          }
        }
      })
      .addCase(checkRegistrationStatus.rejected, (state, action: any) => {
        state.status = "idle";
        state.success = false;
        state.error = true;
        state.message = action.payload.message;
        state.streamingUrl = null;
        state.registrationComplete = true;
        state.redirectToLogin = false;
      })
      .addCase(logout, (state,) => {
        state.status = "idle";
        state.user = null;
        state.token = false;
        state.isAuthenticated = false;
        state.redirectToLogin = false;
      });
  },
});

export const { setCredentials, resetAuth, syncAuthState, clearMessage } = authSlice.actions; // logout, 
export { logout }
export default authSlice.reducer;
