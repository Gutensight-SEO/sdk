/** @format */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Card, 
  Grid, 
  Typography, 
  Divider, 
  List, 
  ListItem, 
  ListItemText,
  Chip,
  CircularProgress,
  Button,
  Avatar
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { getProfile } from '@/redux/features/dashboard/profile/actions.profile.ts';
import { AppDispatch } from '@/redux/app/store.ts';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { profile, status, error, message } = useSelector((state: any) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{message}</Typography>
      </Box>
    );
  }

  // Add console log to debug the data
  console.log('Profile Data:', profile);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">My Profile</Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate('/dashboard/setting/update-profile')}
        >
          Edit Profile
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Personal Information Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                src={profile?.user?.profilePicture}
                sx={{ width: 80, height: 80, mr: 2 }}
              />
              <Box>
                <Typography variant="h6">
                  {profile?.user ? `${profile.user.firstname} ${profile.user.lastname}` : 'Loading...'}
                </Typography>
                <Typography color="text.secondary">
                  {profile?.user?.role || 'User'}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem>
                <ListItemText 
                  primary="Full Name" 
                  secondary={profile?.user ? `${profile.user.firstname} ${profile.user.lastname}` : 'N/A'} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Username" 
                  secondary={profile?.user?.username || 'N/A'} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Email" 
                  secondary={profile?.user?.email || 'N/A'} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Role" 
                  secondary={profile?.user?.role || 'N/A'} 
                />
              </ListItem>
            </List>
          </Card>
        </Grid>

        {/* API Usage & Subscriptions Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>API Usage & Subscriptions</Typography>
            {profile?.subscriptions && profile.subscriptions.length > 0 ? (
              <List>
                {profile.subscriptions.map((sub: any) => (
                  <ListItem key={sub._id} sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
                    <Box sx={{ width: '100%', mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {sub.subscriptionPlanId.name}
                        </Typography>
                        <Chip 
                          label={sub.status}
                          color={
                            sub.status === 'active' ? 'success' : 
                            sub.status === 'expired' ? 'error' : 
                            'warning'
                          }
                          size="small"
                        />
                      </Box>
                      
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          API Requests: {sub.usedApiRequests} / {sub.totalApiRequests}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Remaining Calls: {sub.remainingApiRequests}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Valid until: {new Date(sub.endDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ width: '100%' }} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography color="text.secondary" gutterBottom>No active subscriptions</Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/dashboard/subscription/list')}
                >
                  View Plans
                </Button>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;