/** @format */
import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Divider,
  Stack
} from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';
import { VERSION_NUMBER } from '../../../constants';

const sections = [
  { id: 'usage', title: 'Usage' },
  { id: 'examples', title: 'Examples' }
];

const codeSample = `// seo.config.js
module.exports = {
  outputDir: './public',
  analyticsDir: './gutensight-analytics',
  language: 'js',
  seoMapFile: 'seo-map.json',
  htmlEntryFile: './public/index.html',
  router: {
    path: './src/router.js', // Path to the router file
    routeProperties: {
      title: 'title',
      seoExclude: 'seoExclude',
      metadata: 'metadata'
    }
  },
  customOptions: {
    seoRules: {
      injectSeoMap: false,      
    },
    sitemap: {
      hostname: process.env.SITE_URL || 'https://example.com',
      exclude: [],
      changefreq: 'weekly',
      priority: 0.5
    },
    robots: {
      rules: ['User-agent: *', 'Allow: /'],
      sitemapPath: '/sitemap.xml',
    },
  }
};`;

const flowNodes = [
  { id: '1', data: { label: 'seo init' }, position: { x: 0, y: 0 } },
  { id: '2', data: { label: 'seo compile' }, position: { x: 200, y: 0 } },
  { id: '3', data: { label: 'seo pages | seo page <route>' }, position: { x: 400, y: 0 } },
  { id: '4', data: { label: 'seo build' }, position: { x: 600, y: 0 } }
];

const flowEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true }
];

const Documentation: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [version, setVersion] = useState(VERSION_NUMBER);
  const drawerWidth = 240;
  const contentRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value);
  const handleVersionChange = (_: any, newVer: string) => newVer && setVersion(newVer);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const filteredSections = sections.filter(s => s.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: { width: drawerWidth, boxSizing: 'border-box', p: 2 }
        }}
      >
        <Typography variant="h6" gutterBottom>
          Table of Contents
        </Typography>
        <TextField
          label="Search"
          value={filter}
          onChange={handleFilterChange}
          size="small"
          fullWidth
          sx={{ mb: 2 }}
        />
        <List>
          {filteredSections.map(section => (
            <ListItemButton key={section.id} onClick={() => scrollTo(section.id)}>
              <ListItemText primary={section.title} />
            </ListItemButton>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2">Version:</Typography>
        <ToggleButtonGroup
          value={version}
          exclusive
          onChange={handleVersionChange}
          size="small"
          aria-label="Version toggle"
        >
          <ToggleButton value={VERSION_NUMBER}>{VERSION_NUMBER}</ToggleButton>
          {/* <ToggleButton value="2.0">2.0</ToggleButton> */}
        </ToggleButtonGroup>
      </Drawer>

      <Container maxWidth="lg" sx={{ pl: 4, pr: 4, py: 8 }} ref={contentRef}>
        <Typography variant="h1" component="h1" gutterBottom>
          Gutensight-SEO Usage & Examples
        </Typography>

        <Box component="section" id="usage" mb={6}>
          <Typography variant="h2" component="h2" gutterBottom>
            Usage
          </Typography>
          <Typography paragraph>
            To integrate Gutensight-SEO into your project, follow these steps:
          </Typography>

          <Stack direction='column' spacing={2}>
            <Box sx={{ flex: 2 }}>
              <List>
                <ListItemText>
                  <strong>1.</strong> Install the SDK globally: <code>npm install -g gutensight-seo</code>
                </ListItemText>
                <ListItemText>
                  <strong>2.</strong> Initialize configuration: <code>seo init</code> (creates <code>seo.config.js</code> with default keys)
                </ListItemText>
                <ListItemText>
                  <strong>3.</strong> Compile routes: <code>seo compile</code> (generates <code>seo-map.json</code>)
                </ListItemText>
                <ListItemText>
                  <strong>4.</strong> Analyze pages: <code>seo pages</code> or <code>seo page &lt;route&gt;</code>
                </ListItemText>
                <ListItemText>
                  <strong>5.</strong> Build SEO files: <code>seo build</code> (outputs <code>robots.txt</code> and <code>sitemap.xml</code>)
                </ListItemText>
              </List>
            </Box>

            <Box sx={{ flex: 1 }}>
              <SyntaxHighlighter language="javascript" style={materialLight} showLineNumbers>
                {codeSample}
              </SyntaxHighlighter>
              <Button
                size="small"
                variant="outlined"
                onClick={() => navigator.clipboard.writeText(codeSample)}
                sx={{ mt: 1 }}
              >
                Copy Config Snippet
              </Button>
            </Box>
          </Stack>
        </Box>

        <Box component="section" id="examples" mb={6}>
          <Typography variant="h2" component="h2" gutterBottom>
            Examples
          </Typography>
          <Typography paragraph>
            Below is a diagram illustrating the Gutensight-SEO command workflow:
          </Typography>
          <Box sx={{ height: 200, mb: 4 }}>
            <ReactFlow nodes={flowNodes} edges={flowEdges} fitView>
              <Background />
              <Controls />
            </ReactFlow>
          </Box>
          <Typography paragraph>
            You can customize per-route metadata in generated <code>seo-map.json</code> file as shown:
          </Typography>
          <SyntaxHighlighter language="json" style={materialLight} showLineNumbers>
{`[
  {
    "route": "/",
    "metadata": {
      "title": "Home - My App",
      "description": "Welcome to My App home page",
      "keywords": ["dashboard", "analytics"],
      "changefreq": "daily",
      "priority": 1.0
    }
  },
  {
    "route": "/products",
    "metadata": {
      "title": "Our Products",
      "description": "Explore all products",
      "keywords": ["ecommerce", "catalog"],
      "changefreq": "weekly",
      "priority": 0.8
    }
  }
]`}
          </SyntaxHighlighter>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigator.clipboard.writeText(JSON.stringify([
              {
                route: '/',
                metadata: {
                  title: 'Home - My App',
                  description: 'Welcome to My App home page',
                  keywords: ['dashboard', 'analytics'],
                  changefreq: 'daily',
                  priority: 1.0
                }
              },
              {
                route: '/products',
                metadata: {
                  title: 'Our Products',
                  description: 'Explore all products',
                  keywords: ['ecommerce', 'catalog'],
                  changefreq: 'weekly',
                  priority: 0.8
                }
              }
            ], null, 2))}
            sx={{ mt: 1 }}
          >
            Copy Metadata Snippet
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Documentation;
