/** @format */

import { Box, Button, Container, Typography } from '@mui/material';
import { FallbackProps } from 'react-error-boundary';


const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Something went wrong
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          {error.message}
        </Typography>
        <Button variant="contained" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorFallback;