/** @format */
import { FC } from 'react';
import { Container, Typography, Box, Grid, Divider } from '@mui/material';

const About: FC = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            About Gutensight SEO SDK
          </Typography>

          <Typography variant="body1" sx={{ mb: 4 }}>
            Gutensight is a platform-agnostic SEO SDK engineered to fix long-standing SEO limitations in JavaScript-heavy applications.
            Whether you're using React, Vue, Angular, or Svelte, Gutensight brings immediate SEO visibility by
            generating metadata and crawler-friendly files like <code>sitemap.xml</code> and <code>robots.txt</code>,
            and enriches it all with machine learning–driven metadata scoring and optimization feedback.
          </Typography>

          <Divider sx={{ my: 6 }} />

          <Typography variant="h2" component="h2" gutterBottom>
            SDK Architecture Overview
          </Typography>

          <Grid container spacing={6} mt={1}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h3" gutterBottom>
                Machine Learning Pipeline
              </Typography>
              <Typography variant="body1" paragraph>
                Gutensight integrates seamlessly with Altruva Group's proprietary ML models for enhanced SEO evaluation and optimization:
              </Typography>
              <ul style={{ marginLeft: '1.25rem' }}>
                <li>Content Relevance Scoring</li>
                <li>Semantic Keyword Analysis</li>
                <li>PageRank Prediction</li>
                <li>Competitor Gap Analysis</li>
              </ul>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h3" gutterBottom>
                How It Works
              </Typography>
              <Typography variant="body1" paragraph>
                After installation and setup, Gutensight scans your routing system, generates metadata via
                <code>seo-map.json</code>, and injects SEO tags directly into <code>index.html</code> before hydration.
                It bypasses the need for SSR/SSG and keeps SEO implementation lightweight and transparent.
              </Typography>
              <ul style={{ marginLeft: '1.25rem' }}>
                <li>Generate metadata per route</li>
                <li>AI-enhanced scoring & recommendations</li>
                <li>Metadata injection before framework boot</li>
                <li>Zero server overhead, zero runtime penalties</li>
              </ul>
            </Grid>
          </Grid>

          <Divider sx={{ my: 6 }} />

          <Box mt={4}>
            <Typography variant="h3" component="h3" gutterBottom>
              Why Gutensight?
            </Typography>
            <Typography variant="body1" paragraph>
              Existing SEO solutions tied to modern frameworks come with complexity, server load, and late hydration.
              Gutensight decouples SEO logic from the framework lifecycle entirely.
              It is:
            </Typography>
            <ul style={{ marginLeft: '1.25rem' }}>
              <li><strong>Faster</strong>: No need for runtime SSR or costly hydration delays</li>
              <li><strong>Flexible</strong>: Works across all modern JavaScript frameworks</li>
              <li><strong>ML-Powered</strong>: Provides actionable SEO scores and reports</li>
              <li><strong>Friendly</strong>: Centralized metadata makes it easy to manage and edit</li>
            </ul>
          </Box>

          <Box mt={8} id="analysis-results">
            <Typography variant="h3" component="h3" gutterBottom>
              Sample SEO Analysis Output
            </Typography>
            <Typography variant="body2" paragraph>
              After running <code>$ seo analyze:page /about</code>, here’s a typical output:
            </Typography>

            <Box
              component="pre"
              sx={{
                bgcolor: 'background.paper',
                p: 3,
                borderRadius: 1,
                fontSize: '0.9rem',
                mb: 4,
                border: '1px solid #e0e0e0',
                overflowX: 'auto',
              }}
            >
              <code>
                $ seo page /about{'\n'}
                ▶ 92/100 SEO Score{'\n'}
                ✓ Optimal Title Length{'\n'}
                ✓ Mobile-Friendly{'\n'}
                ⚠️ Missing alt tags on 3 images{'\n'}
              </code>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default About;
