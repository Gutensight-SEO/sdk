import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { getSubscriptionPlans } from '@/redux/features/dashboard/subscription/actions.subscription.ts';
import { AppDispatch } from '@/redux/app/store.ts';

interface SubscriptionPlan {
  _id: string;
  name: string;
  description: string;
  priceUSD: number;
  apiRequestQuota: number;
  durationDays: number;
  isActive: boolean;
  isFreetier?: boolean;
  paymentLink: string;
}

export const SubscriptionList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { plans, status, error, message } = useSelector((state: any) => state.subscription);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        await dispatch(getSubscriptionPlans()).unwrap();
      } catch (err) {
        console.error('Failed to fetch subscription plans:', err);
      }
    };
    fetchPlans();
  }, [dispatch]);

  // Add debug logs
  console.log('Subscription state:', { plans, status, error, message });

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Ensure plans is an array
  const subscriptionPlans = Array.isArray(plans) ? plans : [];

  const handleSubscribe = (paymentLink: string) => {
    window.open(paymentLink)
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Subscription Plans</Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{message}</Alert>
      )}

      {subscriptionPlans.length === 0 && !error && (
        <Alert severity="info" sx={{ mb: 2 }}>No subscription plans available</Alert>
      )}

      <Grid container spacing={3}>
        {subscriptionPlans.map((plan: SubscriptionPlan) => (
          <Grid item xs={12} md={4} key={plan._id}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>{plan.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {plan.description}
              </Typography>
              <Typography variant="h4" sx={{ mb: 2 }}>${plan.priceUSD}/year</Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                {plan.apiRequestQuota.toLocaleString()} API Calls
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Valid for {plan.durationDays} days
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleSubscribe(plan.paymentLink)}
                disabled={!plan.isActive}
              >
                {plan.isActive ? 'Subscribe Now' : 'Currently Unavailable'}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SubscriptionList;