import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  Divider,
  CircularProgress
} from '@mui/material';
import { updateProfile, checkUpdateStatus } from '@/redux/features/dashboard/settings/updateProfile/actions.updateProfile.ts';
import { resetUpdateProfile } from '@/redux/features/dashboard/settings/updateProfile/slice.updateProfile.ts';
import { AppDispatch } from '@/redux/app/store.ts';
import { getProfile } from '@/redux/features/dashboard/profile/actions.profile.ts';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.auth);
  const { 
    status, 
    error, 
    message, 
    streamingUrl, 
    updateComplete, 
    redirectToProfile 
  } = useSelector((state: any) => state.updateProfile);
  const { profile } = useSelector((state: any) => state.profile);

  const [formData, setFormData] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Reset state on mount
  useEffect(() => {
    dispatch(resetUpdateProfile());
  }, [dispatch]);

  // Fetch profile data on mount
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // Update formData when profile is loaded
  useEffect(() => {
    if (profile?.user) {
      setFormData(prevData => ({
        ...prevData,
        firstname: profile.user.firstname || '',
        lastname: profile.user.lastname || '',
        username: profile.user.username || '',
        email: profile.user.email || '',
      }));
    }
  }, [profile]);

  // Poll update status when streaming URL is available
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (streamingUrl && status === 'streaming') {
      intervalId = setInterval(() => {
        void dispatch(checkUpdateStatus(streamingUrl));
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [streamingUrl, status, dispatch]);

  // Navigate after successful update
  useEffect(() => {
    if (updateComplete && !error && redirectToProfile) {
      const timeoutId = setTimeout(() => {
        navigate('/dashboard/profile');
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [updateComplete, error, redirectToProfile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    // Validate passwords if being updated
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        alert("New passwords don't match!");
        return;
      }
      if (!formData.currentPassword) {
        alert("Current password required to set new password!");
        return;
      }
    }

    try {
      console.log('Submitting update with data:', formData);
      const result = await dispatch(updateProfile({
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        ...(formData.newPassword && {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      })).unwrap();

      console.log('Update result:', result);

      if (result.success) {
        // Refresh profile data
        await dispatch(getProfile());
        setTimeout(() => navigate('/dashboard/profile'), 2000);
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>Update Profile</Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{message}</Alert>}
        {status === 'success' && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Profile updated successfully! Redirecting...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstname}
                onChange={(e) => setFormData({...formData, firstname: e.target.value})}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastname}
                onChange={(e) => setFormData({...formData, lastname: e.target.value})}
              />
            </Stack>

            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />

            <TextField
              fullWidth
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />

            <Divider sx={{ my: 2 }}>
              <Typography color="textSecondary">Change Password (Optional)</Typography>
            </Divider>

            <TextField
              fullWidth
              type="password"
              label="Current Password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
            />

            <TextField
              fullWidth
              type="password"
              label="New Password"
              value={formData.newPassword}
              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
            />

            <TextField
              fullWidth
              type="password"
              label="Confirm New Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />

            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                disabled={status === 'loading'}
                sx={{ flex: 1 }}
              >
                {status === 'loading' ? <CircularProgress size={24} /> : 'Save Changes'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard/profile')}
                sx={{ flex: 1 }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
        {status === 'streaming' && (
          <Typography color="info.main" align="center">
            Updating profile...
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default UpdateProfile;
