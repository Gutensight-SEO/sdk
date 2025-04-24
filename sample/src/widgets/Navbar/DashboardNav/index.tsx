/** @format */

import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Menu, 
  MenuItem, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Collapse,
  useMediaQuery,
  Theme
} from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/features/auth/actions.auth.ts';
import { dashboardNavItems } from '@/navigation/NavigationMenusItems/DashboardNavMenuItems/index.ts';
import { NavigationItem } from '@/navigation/NavigationMenusItems/DashboardNavMenuItems/types.ts';
import { AppDispatch } from '@/redux/app/store.ts';
import { syncAuthState } from '@/redux/features/auth/slice.auth.ts';

const DashboardNav: React.FC = () => {
  // const theme = useTheme();
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
                  onClick={() => handleMobileDropdown(item.title)}
                  divider
                >
                  <ListItemText primary={item.title} />
                  {activeMobileDropdown === item.title ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={activeMobileDropdown === item.title} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.dropdownItems.map((dropdownItem) => (
                      <ListItem 
                        key={dropdownItem.path}
                        component={Link}
                        to={dropdownItem.path}
                        onClick={toggleMobileMenu}
                        divider
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
                component={Link}
                to={item.path}
                onClick={toggleMobileMenu}
                divider
              >
                <ListItemText primary={item.title} />
              </ListItem>
            )}
          </div>
        ))}
        
        <ListItem 
          onClick={isAuthenticated ? handleLogout : toggleMobileMenu}
          component={RouterLink}
          to='/session/login'
          // component={!isAuthenticated ? RouterLink : undefined}
          // to={!isAuthenticated ? '/session/login' : undefined}
          divider
          sx={{
            mt: 2,
            border: '1px solid',
            borderColor: isAuthenticated === 'dark' ? 'primary.light' : 'primary.dark',
            color: 'black',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }
          }}
        >
            <ListItemText primary={isAuthenticated ? 'Logout' : 'Login'} 
            // sx={{
            //   ...authButtonStyles
            // }}
          />
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
                    component={Link}
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
        </>
      )}
    </Box>
  );
};

export default DashboardNav;