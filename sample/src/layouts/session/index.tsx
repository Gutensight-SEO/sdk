// import { FC } from 'react';
import { Link, Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Container, Typography, useTheme } from '@mui/material'; // , IconButton
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { useThemeMode } from '@/themes';
import SessionPageNav from '@/widgets/Navbar/SessionPageNav/index.tsx';
import Footer from '@/widgets/Footer';

import Logo from "@/assets/images/logo.png";


const SessionLayout: React.FC = () => {
  const theme = useTheme();
  // const { toggleThemeMode } = useThemeMode();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} 
        sx={{ 
          backgroundColor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.main', 
          color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.light' 
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: '100%',
            px: { xs: 2, md: 4 }, // Add horizontal padding
            display: { xs: 'flex', md: 'grid' },
            gridTemplateColumns: { md: '1fr auto 1fr' },
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo and Site Name */}
          {/* <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
            {Logo && <img src={Logo} alt="Logo" style={{ width: '50px', height: '50px' }} />}
            <Typography variant="h6" component="span" sx={{ marginLeft: '10px' }}>
              Gutensight SEO
            </Typography>
          </Link> */}
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