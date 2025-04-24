import { FC, ReactNode } from 'react';
import { Card, CardContent, Typography, useTheme } from '@mui/material';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description, children }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        p: 3,
        border: `2px solid ${theme.palette.divider}`,
        flex: 1,
      }}
    >
      <CardContent>
        {icon}
        <Typography variant="h5" component="h3" gutterBottom mt={2}>
          {title}
        </Typography>
        <Typography variant="body1">{description}</Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
