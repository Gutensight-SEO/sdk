/** @format */

import { useEffect } from 'react'; // React, 
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { getHome } from '@/redux/features/dashboard/home/actions.home.ts';
import { AppDispatch } from '@/redux/app/store.ts';

export const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { analytics, status, error, message } = useSelector((state: any) => state.home);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getHome()).unwrap();
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>{message}</Typography>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 3, 
            bgcolor: 'primary.light',
            '& .MuiTypography-root': { color: 'rgba(0, 0, 0, 0.87)' }
          }}>
            <Typography variant="h6" fontWeight="medium">Total API Requests</Typography>
            <Typography variant="h3" fontWeight="bold">{analytics?.totalRequests || 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 3, 
            bgcolor: 'success.light',
            '& .MuiTypography-root': { color: 'rgba(0, 0, 0, 0.87)' }
          }}>
            <Typography variant="h6" fontWeight="medium">Active Subscriptions</Typography>
            <Typography variant="h3" fontWeight="bold">{analytics?.activeSubscriptions || 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 3, 
            bgcolor: 'info.light',
            '& .MuiTypography-root': { color: 'rgba(0, 0, 0, 0.87)' }
          }}>
            <Typography variant="h6" fontWeight="medium">Remaining API Calls</Typography>
            <Typography variant="h3" fontWeight="bold">{analytics?.remainingCalls || 0}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;