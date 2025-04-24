import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AutoAwesome,
  DataThresholding,
  Api,
  Insights,
  SettingsSuggest,
} from '@mui/icons-material';

const Welcome: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          py: 10,
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Elevate Your SEO Strategy
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Next-Gen SEO Optimization Toolkit for Modern Web Apps
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 4 }} flexWrap="wrap" justifyContent="center">
          <Button
            variant="contained" size="large"
            component={RouterLink}
            to={"https://www.npmjs.com/package/gutensight"}
            // to="/contact"
           >
            Get Started
          </Button>
          <Button 
            variant="outlined" size="large"
            component={RouterLink}
            to="/about"
          >
            Learn More
          </Button>
        </Stack>
      </Box>

      {/* Feature Section */}
      <Box sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h3" component="h2" gutterBottom>
          Powered by Gutensight-SEO
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
          The Smart SEO Companion That Integrates Seamlessly With Your Dev Stack
        </Typography>

        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
          sx={{
            '& > .equal-card': {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'stretch',
            },
          }}
        >
          {/* Card 1 */}
          <Card className="equal-card">
            <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
              <AutoAwesome fontSize="large" color="primary" />
              <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
                Automated Workflows
              </Typography>
              <Typography>
                Automated SEO files built directly from your router configuration file:
              </Typography>
              <Box component="pre" sx={{ mt: 2, textAlign: 'left', overflowX: 'auto' }}>
                <code>
                  {`$ seo compile\n`}
                </code>
              </Box>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="equal-card">
            <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
              <DataThresholding fontSize="large" color="primary" />
              <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
                Real-Time Analytics
              </Typography>
              <Typography paragraph>
                Track SEO performance metrics:
              </Typography>
              <Box component="ul" sx={{ textAlign: 'left', pl: 3, mb: 0 }}>
                <li>Search Visibility Index</li>
                <li>Keyword Rankings</li>
                <li>Crawl Health Monitoring</li>
              </Box>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="equal-card">
            <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
              <Api fontSize="large" color="primary" />
              <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
                REST API Access
              </Typography>
              <Typography>
                Integrate Gutensight-SEO insights into your own systems:
              </Typography>
              <Box component="pre" sx={{ mt: 2, textAlign: 'left', overflowX: 'auto' }}>
                <code>
                  {`POST /v1/analyze/all\n`}
                  {`POST /v1/analyze`}
                </code>
              </Box>
            </CardContent>
          </Card>
        </Stack>

        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
          sx={{
            mt: 4,
            '& > .equal-card': {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'stretch',
            },
          }}
        >
          {/* Card 4 */}
          <Card className="equal-card">
            <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
              <AutoAwesome fontSize="large" color="primary" />
              <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
                CI/CD Friendly SEO Automation
              </Typography>
              <Typography>
                Streamline optimization directly in your build pipeline:
              </Typography>
              <Box component="pre" sx={{ mt: 2, textAlign: 'left', overflowX: 'auto' }}>
                <code>
                  {`"scripts": {\n`}
                  {`  "build": "seo build && next build",\n`}
                  {`  "analyze": "seo analyze"\n`}
                  {`}`}
                </code>
              </Box>
            </CardContent>
          </Card>

          {/* Card 5 */}
          <Card className="equal-card">
            <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
              <Insights fontSize="large" color="primary" />
              <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
                AI-Powered SEO Scoring
              </Typography>
              <Typography paragraph>
                Real-time SEO insights with smart analysis:
              </Typography>
              <Box component="ul" sx={{ textAlign: 'left', pl: 3, mb: 0 }}>
                <li>Metadata Scoring</li>
                <li>Search Visibility Index</li>
                <li>Crawl Health Reports</li>
              </Box>
            </CardContent>
          </Card>

          {/* Card 6 */}
          <Card className="equal-card">
            <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
              <SettingsSuggest fontSize="large" color="primary" />
              <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
                Framework-Agnostic SDK
              </Typography>
              <Typography>
                Plug-and-play integration across ecosystems:
              </Typography>
              <Box component="pre" sx={{ mt: 2, textAlign: 'left', overflowX: 'auto' }}>
                <code>
                  {`import { configureSEO } from 'gutensight';\n\n`}
                  {`configureSEO({\n`}
                  {`  siteUrl: 'https://yourdomain.com',\n`}
                  {`  routes: [ ... ],\n`}
                  {`});`}
                </code>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Container>
  );
};

export default Welcome;
