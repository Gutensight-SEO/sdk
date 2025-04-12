import { FC } from 'react';
import { Link, Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Container, Typography, IconButton, useTheme, Stack } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from '@/themes';
import LandingPageNav from '@/widgets/Navbar/LandingPageNav';
import Footer from '@/widgets/Footer';

const LandingPageLayout: FC = () => {
  const theme = useTheme();
  const { toggleThemeMode } = useThemeMode();

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
          <Link to="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {import.meta.env.VITE_SITE_NAME || 'Gutensight SEO'}
            </Typography>
          </Link>
          <LandingPageNav />
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
          >
            {/* <IconButton sx={{ mr: 2 }} onClick={toggleThemeMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton> */}
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

export default LandingPageLayout;