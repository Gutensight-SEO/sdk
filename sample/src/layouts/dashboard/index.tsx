import React, { useEffect } from 'react';
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import DashboardNav from '@/widgets/Navbar/DashboardNav/index.tsx';
// import { RootState } from '@/redux/app/types.ts';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography, useTheme } from '@mui/material'; // , Button,  IconButton
import Footer from '@/widgets/Footer/index.tsx';
// import { useThemeMode } from '@/themes/CustomThemeProvider.tsx';
import { AppDispatch } from '@/redux/app/types.ts';
import { logout } from '@/redux/features/auth/actions.auth.ts';
import { syncAuthState } from '@/redux/features/auth/slice.auth.ts';
import Logo from "@/assets/images/logo.png";

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  // const { toggleThemeMode } = useThemeMode();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/session/login', { replace: true });
  };

  useEffect(() => {
    // Sync auth state with cookies on mount and when auth state changes
    dispatch(syncAuthState());
    
    // console.log("DASHBOARD LAYOUT AUTH STATE", {isAuthenticated, user})
    if (!isAuthenticated || !user) {
      dispatch(logout())
      navigate('/session/login', { replace: true });
    }
  }, [isAuthenticated, user, navigate, dispatch]);

  const authButtonStyles = {
    color: 'white',
    backgroundColor: isAuthenticated ? 'error.main' : 'primary.main',
    borderRadius: '5px',
    border: '1px solid',
    borderColor: isAuthenticated ? 'error.dark' : 'primary.dark',
    '&:hover': {
      backgroundColor: isAuthenticated ? 'error.dark' : 'primary.dark',
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} 
        sx={{ 
          backgroundColor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.main', 
          color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.light' 
        }}>
        <Toolbar
          disableGutters
          sx={{
            width: '100%',
            px: { xs: 2, md: 4 },
            display: { xs: 'flex', md: 'grid' },
            gridTemplateColumns: { md: '1fr auto 1fr' },
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          >
          {/* Left Section: Logo and Site Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: 1, md: 0 } }}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {Logo && (
                <img src={Logo} alt="Logo" style={{ width: '30px', height: '25px' }} />
              )}
              <Typography variant="h6" component="span" sx={{ ml: '10px' }}>
                Gutensight SEO
              </Typography>
            </Link>
          </Box>

          {/* Center Section: Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            <DashboardNav />
          </Box>

          {/* Right Section: Login/Logout Button (Hidden on Mobile) */}
          <Stack direction="row" gap={2} alignItems="center" sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={isAuthenticated ? handleLogout : undefined}
              component={!isAuthenticated ? Link : undefined}
              to={!isAuthenticated ? '/session/login' : undefined}
              sx={{
                ...authButtonStyles,
              }}
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </Button>
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