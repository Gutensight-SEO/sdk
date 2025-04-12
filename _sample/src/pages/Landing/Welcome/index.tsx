/** @format */
import { FC } from 'react';
import { Card, Container, Typography, Box, Button, Grid, CardContent } from '@mui/material';
import { 
  AutoAwesome, 
  DataThresholding, 
  Api 
} from '@mui/icons-material';

const Welcome: FC = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ 
          py: 8, 
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Elevate Your SEO Strategy
          </Typography>
          <Typography variant="h5" color="text.secondary" mb={4}>
            Next-Gen SEO Optimization Toolkit for Modern Web Apps
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" size="large" sx={{ mr: 2 }}>
              Get Started
            </Button>
            <Button variant="outlined" size="large">
              Learn More
            </Button>
          </Box>
        </Box>

        {/*  */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Enterprise SEO Platform
          </Typography>
          
          <Typography variant="h5" color="text.secondary" mb={6}>
            CI/CD Integrated SEO Optimization Suite
          </Typography>

          <Grid container spacing={4} mt={6}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <AutoAwesome fontSize="large" color="primary" />
                  <Typography variant="h5" component="h3" gutterBottom mt={2}>
                    Automated Workflows
                  </Typography>
                  <Typography>
                    Seamless integration with your build process:
                  </Typography>
                  <Box component="pre" sx={{ mt: 2, ml: -20, pl: -10 }}>
                    <code>
                      {`"scripts": {\n`}
                      {`\t\t  "build": "seo build && next build",\n`}
                      {`\t\t  "analyze": "seo analyze"\n`}
                      {`}`}
                    </code>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <DataThresholding fontSize="large" color="primary" />
                  <Typography variant="h5" component="h3" gutterBottom mt={2}>
                    Real-Time Analytics
                  </Typography>
                  <Typography paragraph>
                    Track SEO performance metrics:
                  </Typography>
                  <ul style={{ textAlign: 'left' }}>
                    <li>Search Visibility Index</li>
                    <li>Keyword Rankings</li>
                    <li>Crawl Health Monitoring</li>
                  </ul>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Api fontSize="large" color="primary" />
                  <Typography variant="h5" component="h3" gutterBottom mt={2}>
                    REST API Access
                  </Typography>
                  <Typography>
                    Integrate with our API endpoints:
                  </Typography>
                  <Box component="pre" sx={{ ml: 0, alignItems: "left"}}>
                    <code>
                      {`POST /v1/analyze/all\n`}
                      {`POST /v1/analyze\n`}
                    </code>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      {/* </Container> */}
      </Container>
    </>
  );
};

export default Welcome;