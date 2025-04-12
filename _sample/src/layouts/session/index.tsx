import { FC } from 'react';
import { Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Container, Typography, IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from '@/themes';
import SessionPageNav from '@/widgets/Navbar/SessionPageNav/index.tsx';
import Footer from '@/widgets/Footer';


const SessionLayout: React.FC = () => {
  const theme = useTheme();
  const { toggleThemeMode } = useThemeMode();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} 
        sx={{ 
          backgroundColor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.main', 
          color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.light' 
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: "space-between",
            gap: 2  // Add spacing between elements
          }}
        >
          <Typography variant="h6" component="div">
            {import.meta.env.VITE_SITE_NAME || 'Gutensight-SEO'}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            <SessionPageNav />
          </Box>
          {/* <IconButton onClick={toggleThemeMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default SessionLayout