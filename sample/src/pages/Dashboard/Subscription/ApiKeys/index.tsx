import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow,
  IconButton,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  ContentCopy as ContentCopyIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon 
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionDetails } from '@/redux/features/dashboard/subscription/actions.subscription.ts';
import { AppDispatch } from '@/redux/app/store.ts';
import { logout } from '@/redux/features/auth/actions.auth.ts';

// interface ApiKey {
//   id: string;
//   name: string;
//   key: string;
//   secret: string;
// }

interface VisibilityState {
  showKey?: boolean;
  showSecret?: boolean;
}

const ApiKeys = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const subscriptionId = location.state?.subscriptionId;

  const [visibility, setVisibility] = useState<VisibilityState>({});

  const { selectedSubscription, status, message, error } = useSelector((state: any) => state.subscription);

  useEffect(() => {
    if (!subscriptionId) {
      navigate('/dashboard/subscription/active');
      return;
    }

    if (status !== 'error') {
      dispatch(getSubscriptionDetails(subscriptionId))
        .unwrap()
        .catch((err) => {
          if (err?.status === 401 || err?.response?.status === 401) {
            dispatch(logout())
            navigate('/session/login');
          }
        });
    }
  }, [subscriptionId, dispatch, navigate]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (status === "loading") {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!selectedSubscription) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Subscription not found</Alert>
      </Box>
    );
  }

  const { subscription, keys } = selectedSubscription;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">API Keys - {subscription.name}</Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{message}</Alert>
      )}

      <Paper sx={{ overflow: 'hidden' }}>
        <Table sx={{ width: '100%' }}>
          <TableHead sx={{ display: { xs: 'none', md: 'table-header-group' } }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>API Key</TableCell>
              <TableCell>Secret Key</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{
              '& td': { 
                display: { xs: 'flex', md: 'table-cell' },
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1,
                py: 2,
                '&::before': {
                  content: 'attr(data-label)',
                  fontWeight: 'bold',
                  display: { xs: 'block', md: 'none' }
                }
              }
            }}>
              <TableCell data-label="Name">
                <Typography fontWeight={500}>{subscription.name}</Typography>
              </TableCell>

              <TableCell data-label="API Key">
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  width: '100%'
                }}>
                  <Typography sx={{ 
                    fontFamily: 'monospace',
                    flexGrow: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {visibility.showKey ? keys.apiKey : '•'.repeat(32)}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={() => setVisibility(prev => ({ ...prev, showKey: !prev.showKey }))}
                    >
                      {visibility.showKey ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                    <IconButton size="small" onClick={() => handleCopy(keys.apiKey)}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </TableCell>

              <TableCell data-label="Secret Key">
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  width: '100%'
                }}>
                  <Typography sx={{ 
                    fontFamily: 'monospace',
                    flexGrow: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {visibility.showSecret ? keys.apiSecret : '•'.repeat(32)}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={() => setVisibility(prev => ({ ...prev, showSecret: !prev.showSecret }))}
                    >
                      {visibility.showSecret ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                    <IconButton size="small" onClick={() => handleCopy(keys.apiSecret)}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ApiKeys;