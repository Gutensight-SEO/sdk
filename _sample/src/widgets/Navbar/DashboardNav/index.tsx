/** @format */

import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Menu, 
  MenuItem, 
  Stack, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Collapse,
  useMediaQuery,
  Theme
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/features/auth/actions.auth.ts';
import { dashboardNavItems } from '@/navigation/NavigationMenusItems/DashboardNavMenuItems';
import { NavigationItem } from '@/navigation/NavigationMenusItems/DashboardNavMenuItems/types';
import { AppDispatch } from '@/redux/app/store.ts';
import { selectIsAuthenticated } from '@/redux/features/auth/selectors.auth';
import { syncAuthState } from '@/redux/features/auth/slice.auth.ts';

const DashboardNav: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  
  useEffect(() => {
    // Sync auth state with cookies on mount and when auth state changes
    dispatch(syncAuthState());
    
    if (!isAuthenticated || !user) {
      dispatch(logout())
      navigate('/session/login', { replace: true });
    }
  }, [isAuthenticated, user, navigate, dispatch]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, title: string) => {
    setAnchorEl(event.currentTarget);
    setActiveDropdown(title);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  const handleMobileDropdown = (title: string) => {
    setActiveMobileDropdown(activeMobileDropdown === title ? null : title);
  };

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
        {dashboardNavItems.map((item: NavigationItem) => (
          <div key={item.title}>
            {item.dropdownItems ? (
              <>
                <ListItem 
                  button 
                  onClick={() => handleMobileDropdown(item.title)}
                >
                  <ListItemText primary={item.title} />
                  {activeMobileDropdown === item.title ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={activeMobileDropdown === item.title} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.dropdownItems.map((dropdownItem) => (
                      <ListItem 
                        key={dropdownItem.path}
                        component={RouterLink}
                        to={dropdownItem.path}
                        onClick={toggleMobileMenu}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText primary={dropdownItem.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem
                component={RouterLink}
                to={item.path}
                onClick={toggleMobileMenu}
                button
              >
                <ListItemText primary={item.title} />
              </ListItem>
            )}
          </div>
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
          <Box sx={{ display: 'flex', gap: 2, ml: 4 }}>
            {dashboardNavItems.map((item: NavigationItem) => (
              <React.Fragment key={item.title}>
                {item.dropdownItems ? (
                  <>
                    <Button
                      color="inherit"
                      onClick={(e) => handleMenuOpen(e, item.title)}
                      endIcon={<KeyboardArrowDownIcon />}
                      sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}
                    >
                      {item.title}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={activeDropdown === item.title}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      {item.dropdownItems.map((dropdownItem) => (
                        <MenuItem
                          key={dropdownItem.path}
                          component={RouterLink}
                          to={dropdownItem.path}
                          onClick={handleMenuClose}
                        >
                          {dropdownItem.title}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Button
                    component={RouterLink}
                    to={item.path}
                    color="inherit"
                    sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}
                  >
                    {item.title}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </Box>
          
          <Button
            onClick={isAuthenticated ? handleLogout : undefined}
            component={!isAuthenticated ? RouterLink : undefined}
            to={!isAuthenticated ? '/session/login' : undefined}
            sx={{ 
              ml: 'auto',
              ...authButtonStyles
            }}
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default DashboardNav;