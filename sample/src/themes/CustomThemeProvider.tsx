/** @format */

import { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { getPalette } from './Palette';
import { shadows } from './Shadows';
import typography from './Typography'; // Add this import

const ThemeModeContext = createContext({ toggleThemeMode: () => {} });

export const useThemeMode = () => {
  return useContext(ThemeModeContext);
};

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: getPalette(mode),
        shadows: shadows,
        typography: typography, 
      }),
    [mode],
  );

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};