/** @format */
import { FC } from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

const Documentation: FC = () => {
  return (
    <>
      {/* <gutensight-title>GutenSight Documentation - Developer Guides</gutensight-title>
      <gutensight-description>Comprehensive documentation for GutenSight SDK, API integration, and SEO best practices</gutensight-description>
      <gutensight-keywords>documentation, API guide, SDK integration</gutensight-keywords>
      <gutensight-changefreq>weekly</gutensight-changefreq> */}

      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Developer Documentation
          </Typography>
          <Typography variant="h5" color="text.secondary" mb={6}>
            Comprehensive Guides & API References
          </Typography>
          
          <Box component="section" mb={6}>
            <Typography variant="h2" component="h2" gutterBottom>
              Getting Started
            </Typography>
            <Typography paragraph>
              Learn how to integrate our SDK into your project...
            </Typography>
          </Box>

          <Box component="section">
            <Typography variant="h2" component="h2" gutterBottom>
              API Reference
            </Typography>
            <Typography paragraph>
              Detailed documentation for all API endpoints...
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Documentation;