import API from "@/redux/api/index.ts";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk to register new freelancer
export const register = createAsyncThunk(
  "auth/register",
  async (data: {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/register", data);
      
      // Return the streaming URL if available
      if (response.data.url) {
        return {
          message: response.data.message,
          streamingUrl: response.data.url,
          success: true
        };
      }
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Registration failed",
        success: false
      });
    }
  }
);

// Add new action to check registration status
export const checkRegistrationStatus = createAsyncThunk(
  "auth/checkStatus",
  async (url: string, { rejectWithValue }) => {
    try {
      const response = await API.get(url);
      
      // Check if the response contains error data
      if (response.data.success && response.data.status === 'completed' && response.data.data?.statusCode >= 400) {
        return rejectWithValue({
          message: response.data.data.errMessage,
          success: false
        });
      }
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Status check failed",
        success: false
      });
    }
  }
);

// Async Thunk to login freelancer
export const login = createAsyncThunk(
  "auth/login",
  async (data: {detail: string, password: string}, { rejectWithValue }) => {
    try {
      console.log("LOGIN IN...")
      const response = await API.post("/auth/login", data);
      
      if (response) {
        // console.log("--- LOGIN RESPONSE ---");
        // // console.log("Headers:", response.headers);
        // // console.log("Cookies in response:", response.headers['set-cookie']);
        // // console.log("All cookies in document:", document.cookie);
        // console.log("Response data:", response.data);

        if (response.data.success) {
          // // Check cookies immediately after response
          // setTimeout(() => {
          //   console.log("Cookies 500ms after response:", document.cookie);
          //   alert(`Current cookies: ${document.cookie || 'NO COOKIES FOUND'}`);
          // }, 500);

          localStorage.setItem('accessToken', response.data.data.accessToken);
          localStorage.setItem('refreshToken', response.data.data.refreshToken);

          return {
            message: response.data.message,
            user: response.data.data.user,
            success: true
          };
        }
        
        return rejectWithValue({
          message: response.data.message,
          success: false
        });
      } else {
        return rejectWithValue({
          message: "Login failed",
          success: false
        })
      }
    } catch (error: any) {
      console.log("LOGIN ERROR!!!:", {error})
      return rejectWithValue({
        message: error.response?.data?.message || "Login failed",
        success: false
      });
    }
  }
);

// get access token using refresh token
export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async () => {
    const response = await API.get("/auth/refreshtoken");
    return response.data;
  }
);

// // Async Thunk to login freelancer
// export const logout = createAsyncThunk(
//   "auth/logout",
//   async (_, { dispatch }) => {
//     try {
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
//       localStorage.clear(); // Clear all localStorage
//       // Add any other cleanup like API calls here
      
//       // Dispatch an action to purge all redux persist state
//       dispatch({ type: 'RESET_APP_STATE' });
      
//       return {
//         message: "Logout successful",
//       };
//     } catch (error: any) {
//       console.error("logout action error:", error.message);
//       throw error;
//     }
//   }
// );

export const logout = createAction('/auth/logout',
  () => {
    // clear localstorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.clear(); // Clear all localStorage
    
    return { payload: null }
  }
)

// export const logout = createAction('/auth/logout',
//   () => {
//     // clear cookies
//     document.cookie = "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    
//     return { payload: null }
//   }
// )