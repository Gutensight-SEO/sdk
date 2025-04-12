import API from "@/redux/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


// get profile
// // get updateProfile
// export const getProfile = createAsyncThunk(
//   "setting/getProfile",  
//   async (data, { rejectWithValue }) => {
//     try {
//       console.log("getting profile...");
//       const response = await API.get("/profile/", { data });
//       return response.data;
//     } catch (error: any) {
//       console.log("getProfile error:", error.response.data.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// get updateProfile
export const updateProfile = createAsyncThunk(
  "setting/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      console.log("updating profile...");
      const response = await API.patch("/profile/update", { data });
      return response.data;
    } catch (error: any) {
      console.log("updateProfile error:", error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
