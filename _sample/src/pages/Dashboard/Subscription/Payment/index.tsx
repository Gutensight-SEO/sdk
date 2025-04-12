import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';

interface PaymentMethod {
  type: 'crypto' | 'paystack';
  currency: string;
  amount: number;
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const plan = location.state?.plan;

  // useEffect(() => {
  //   if (!plan) {
  //     navigate('/dashboard/subscription/list');
  //   }
  // }, [plan, navigate]);

  // if (!plan) {
  //   return null;
  // }

  const handlePayment = async (paymentMethod: PaymentMethod) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          planId: plan.id,
          paymentMethod
        })
      });

      const data = await response.json();

      if (paymentMethod.type === 'paystack') {
        // Handle Paystack redirect
        window.location.href = data.authorization_url;
      } else {
        // Show crypto payment details
        // You'll need to implement this part based on your crypto payment flow
      }
    } catch (err) {
      setError('Payment initialization failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Complete Your Purchase
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab label="Card Payment" />
            <Tab label="Crypto Payment" />
          </Tabs>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3 }}>
          {activeTab === 0 ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handlePayment({
                type: 'paystack',
                currency: 'USD',
                amount: plan.priceUSD
              })}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : `Pay $${plan.priceUSD} with Card`}
            </Button>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handlePayment({
                    type: 'crypto',
                    currency: 'BTC',
                    amount: plan.priceBTC
                  })}
                  disabled={loading}
                >
                  Pay with Bitcoin
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handlePayment({
                    type: 'crypto',
                    currency: 'ETH',
                    amount: plan.priceETH
                  })}
                  disabled={loading}
                >
                  Pay with Ethereum
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handlePayment({
                    type: 'crypto',
                    currency: 'BNB',
                    amount: plan.priceBNB
                  })}
                  disabled={loading}
                >
                  Pay with BNB
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Payment;