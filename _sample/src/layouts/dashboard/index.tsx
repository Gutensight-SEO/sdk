import React, { useEffect } from 'react';
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import DashboardNav from '@/widgets/Navbar/DashboardNav/index.tsx';
import { RootState } from '@/redux/app/types.ts';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, Box, Button, Container, IconButton, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import Footer from '@/widgets/Footer/index.tsx';
import { useThemeMode } from '@/themes/CustomThemeProvider.tsx';
import { AppDispatch } from '@/redux/app/types.ts';
import { logout } from '@/redux/features/auth/actions.auth.ts';
import { syncAuthState } from '@/redux/features/auth/slice.auth.ts';

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const { toggleThemeMode } = useThemeMode();

  useEffect(() => {
    // Sync auth state with cookies on mount and when auth state changes
    dispatch(syncAuthState());
    
    if (!isAuthenticated || !user) {
      dispatch(logout())
      navigate('/session/login', { replace: true });
    }
  }, [isAuthenticated, user, navigate, dispatch]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} 
        sx={{ 
          backgroundColor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.main', 
          color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.light' 
        }}>
        <Toolbar
          sx={{
            justifyContent: "space-between"
          }}
        >
          <Link to="/dashboard">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {import.meta.env.VITE_SITE_NAME || 'Gutensight SEO'}
            </Typography>
          </Link>
          <DashboardNav />
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
          >
            {/* <IconButton sx={{ mr: 2 }} onClick={toggleThemeMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton> */}
            {/* <Button 
              variant='outlined'
              onClick={handleLogout} 
              color='white'
            >
              Logout
            </Button> */}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default DashboardLayout;