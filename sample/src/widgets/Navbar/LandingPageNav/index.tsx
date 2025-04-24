/** @format */

import { FC, useEffect, useState } from 'react';
import { Link as RouterLink, Link } from "react-router-dom";
import { 
  Box, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  useMediaQuery,
  Theme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/features/auth/actions.auth.ts';
import landingNavItems from '@/navigation/NavigationMenusItems/LandingPageNavMenuItems/index.ts';
import { syncAuthState } from '@/redux/features/auth/slice.auth.ts';

interface NavItem {
  path: string;
  title: string;
}

const LandingPageNav: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  
  useEffect(() => {
    // Sync auth state with cookies on mount and when auth state changes
    dispatch(syncAuthState());
  }, [isAuthenticated, user, dispatch]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
  };

  const authButtonStyles = {
    color: 'white',
    backgroundColor: isAuthenticated ? 'error.main' : 'primary.main',
    borderRadius: '5px',
    border: '1px solid',
    borderColor: isAuthenticated ? 'error.dark' : 'primary.dark',
    '&:hover': {
      backgroundColor: isAuthenticated ? 'error.dark' : 'primary.dark',
    }
  };

  const renderMobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={toggleMobileMenu}
      sx={{ '& .MuiDrawer-paper': { width: 250 } }}
    >
      <List>
        {landingNavItems.map((item: NavItem) => (
          <ListItem 
            key={item.path}
            component={Link}
            to={item.path || ''}
            onClick={toggleMobileMenu}
            divider
            sx={{ pl: 4 }}
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
        <ListItem 
          button 
          onClick={isAuthenticated ? handleLogout : toggleMobileMenu}
          component={!isAuthenticated ? RouterLink : undefined}
          to={!isAuthenticated ? '/session/login' : undefined}
          sx={{
            mt: 2,
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark',
            color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }
          }}
        >
          <ListItemText primary={isAuthenticated ? 'Logout' : 'Login'} />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleMobileMenu}
            sx={{ ml: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
          {renderMobileMenu()}
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', gap: 2, ml: 4}}>
            {landingNavItems.map((item: NavItem) => (
              <Button
                key={item.path}
                component={Link}  // Use Link directly instead of passing as LinkComponent
                to={item.path || ''}
                onClick={toggleMobileMenu}
                color="inherit"
                sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
          
          <Button
            onClick={isAuthenticated ? handleLogout : undefined}
            component={!isAuthenticated ? RouterLink : undefined}
            to={!isAuthenticated ? '/session/login' : undefined}
            sx={{ 
              ml: 'auto',
              ...authButtonStyles, 
              display: { md: 'none' } 
            }}
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default LandingPageNav;