import { FC } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';

const Footer: FC = () => {
  const theme = useTheme();

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
        color: theme.palette.text.secondary 
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} {import.meta.env.VITE_SITE_NAME || 'Gutensight-SEO'}. Owned by Altruva Group.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;