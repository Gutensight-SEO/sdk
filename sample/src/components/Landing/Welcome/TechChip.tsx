import { FC, ReactNode } from 'react';
import { Chip } from '@mui/material';

interface TechChipProps {
  label: string;
  icon: ReactNode;
}

const TechChip: FC<TechChipProps> = ({ label, icon }) => {
  return (
    <Chip
      icon={icon}
      label={label}
      sx={{ fontWeight: 500, fontSize: '0.9rem', px: 1, py: 0.5 }}
      variant="outlined"
    />
  );
};

export default TechChip;
