import { useEffect } from 'react'; // React, 
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Card, 
  Typography, 
  Chip, 
  LinearProgress, 
  Button,
  Alert,
  CircularProgress,
  Stack
} from '@mui/material';
// import { Launch as LaunchIcon } from '@mui/icons-material';
import { getUserSubscriptions } from '@/redux/features/dashboard/subscription/actions.subscription.ts';
import { AppDispatch } from '@/redux/app/store.ts';
import { useNavigate } from 'react-router-dom';

export const ActiveSubscriptions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userSubscriptions, status, error, message } = useSelector((state: any) => state.subscription);

  useEffect(() => {
    dispatch(getUserSubscriptions(true)); // true to get only active subscriptions
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Active Subscriptions</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/dashboard/subscription/list')}
        >
          View Plans
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{message}</Alert>
      )}

      {userSubscriptions.length === 0 ? (
        <Alert severity="info">
          No active subscriptions found. Subscribe to a plan to get started!
        </Alert>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {userSubscriptions.map((sub: any) => (
            <Card key={sub?._id} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{sub?.subscriptionPlanId.name}</Typography>
                <Chip 
                  label={sub?.status}
                  color={sub?.status === 'active' ? 'success' : 'warning'}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  API Calls Usage
                </Typography>
                <LinearProgress 
                  variant="determinate"
                  value={(sub?.usedApiRequests / sub?.totalApiRequests) * 100}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2">
                  {sub?.remainingApiRequests.toLocaleString()} remaining of {sub?.totalApiRequests.toLocaleString()}
                </Typography>
              </Box>

              <Stack 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  Valid until: {new Date(sub?.endDate).toLocaleDateString()}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  // endIcon={<LaunchIcon />}
                  onClick={() => navigate('/dashboard/subscription/api-keys', { 
                    state: { subscriptionId: sub?._id }
                  })}
                >
                  View Subscription
                </Button>
              </Stack>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ActiveSubscriptions;
