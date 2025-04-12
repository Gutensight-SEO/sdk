/** @format */
import { FC } from 'react';
import { Container, Typography, Box, Grid, Avatar } from '@mui/material';
// import { ArchitectureDiagram } from '../components';

const About: FC = () => {
  return (
    <>
      {/* <gutensight-title>About GutenSight SDK | Architecture & Workflow</gutensight-title>
      <gutensight-description>Learn about GutenSight's SDK architecture, ML-powered analysis, and CI/CD integration capabilities</gutensight-description>
      <gutensight-keywords>sdk architecture, ml analysis, seo pipeline</gutensight-keywords>
      <gutensight-changefreq>monthly</gutensight-changefreq> */}

      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            SDK Architecture Overview
          </Typography>

          <Grid container spacing={6} mt={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h3" gutterBottom>
                Machine Learning Pipeline
              </Typography>
              <Typography variant="body1" paragraph>
                Our SDK integrates with Altruva Group's proprietary ML models:
              </Typography>
              <ul>
                <li>Content Relevance Scoring</li>
                <li>Semantic Keyword Analysis</li>
                <li>PageRank Prediction</li>
                <li>Competitor Gap Analysis</li>
              </ul>
            </Grid>
            
            <Grid item xs={12} md={6}>
              {/* <ArchitectureDiagram /> */}
            </Grid>
          </Grid>

          <Box mt={8} id="analysis-results">
            <Typography variant="h3" component="h3" gutterBottom>
              Sample Analysis Output
            </Typography>
            
            <Box component="pre" sx={{ 
              bgcolor: 'background.paper', 
              p: 3, 
              borderRadius: 1,
              mb: 4
            }}>
              <code>
                {`$ seo analyze:page /about\n`}
                {`▶ 92/100 SEO Score\n`}
                {`✓ Optimal Title Length\n`}
                {`✓ Mobile-Friendly\n`}
                {`⚠️ Missing alt tags on 3 images\n`}
              </code>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default About;