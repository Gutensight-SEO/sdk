/** @format */

import { FC, useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
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
import { Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/features/auth/actions.auth.ts';
import sessionNavItems from '@/navigation/NavigationMenusItems/SessionNavMenuItems/index.ts';
import { syncAuthState } from '@/redux/features/auth/slice.auth.ts';

interface NavItem {
  path: string;
  title: string;
}

const SessionPageNav: FC = () => {
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

  // const authButtonStyles = {
  //   color: 'white',
  //   backgroundColor: isAuthenticated ? 'error.main' : 'primary.main',
  //   borderRadius: '5px',
  //   border: '1px solid',
  //   borderColor: isAuthenticated ? 'error.dark' : 'primary.dark',
  //   '&:hover': {
  //     backgroundColor: isAuthenticated ? 'error.dark' : 'primary.dark',
  //   }
  // };

  const renderMobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={toggleMobileMenu}
      sx={{ '& .MuiDrawer-paper': { width: 250 } }}
    >
      <List>
        {sessionNavItems.map((item: NavItem) => (
          <ListItem 
            key={item.path}
            component={RouterLink}
            to={item.path}
            onClick={toggleMobileMenu}
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
        <ListItem 
          onClick={isAuthenticated ? handleLogout : toggleMobileMenu}
          {...(!isAuthenticated && { component: RouterLink as typeof RouterLink, to: '/session/login' })}
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
    <Box sx={{ display: 'flex', gap: 2, flexGrow: 1}}>
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
            {sessionNavItems.map((item: NavItem) => (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                color="inherit"
                sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default SessionPageNav;