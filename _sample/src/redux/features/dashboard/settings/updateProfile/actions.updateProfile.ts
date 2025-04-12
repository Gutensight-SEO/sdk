import API from "@/redux/api/index.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface UpdateProfileData {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (data: UpdateProfileData, { rejectWithValue }) => {
    try {
      console.log('Updating profile with data:', data);
      const response = await API.patch('/user', data); // Changed from /user/ to /user

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message,
          data: response.data.data
        };
      }

      return rejectWithValue({
        message: response.data.message || "Failed to update profile",
        success: false
      });
    } catch (error: any) {
      console.error('Update profile error:', error.response?.data);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to update profile",
        success: false
      });
    }
  }
);

export const checkUpdateStatus = createAsyncThunk(
  "profile/checkUpdateStatus",
  async (url: string, { rejectWithValue }) => {
    try {
      const response = await API.get(url);
      
      if (response.data.status === 'completed') {
        if (response.data.data?.statusCode === 200) {
          return {
            success: true,
            message: "Profile updated successfully",
            data: response.data.data
          };
        }
        return rejectWithValue({
          message: response.data.data?.errMessage || "Update failed",
          success: false
        });
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to check update status",
        success: false
      });
    }
  }
);
