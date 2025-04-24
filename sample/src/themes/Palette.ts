import { PaletteMode } from '@mui/material';

export const getPalette = (mode: PaletteMode) => ({
  mode,
  ...(mode === 'light'
    ? {
        // light mode palette
        primary: {
          main: "#5D87FF",
          light: "#ECF2FF",
          dark: "#4570EA",
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: "#49BEFF",
          light: "#E8F7FF",
          dark: "#23afdb",
          contrastText: '#FFFFFF',
        },
        success: {
          main: "#13DEB9",
          light: "#E6FFFA",
          dark: "#02b3a9",
          contrastText: "#ffffff",
        },
        info: {
          main: "#539BFF",
          light: "#EBF3FE",
          dark: "#1682d4",
          contrastText: "#ffffff",
        },
        background: {
          default: '#FFFFFF',
          paper: '#FFFFFF',
        },
        text: {
          primary: '#212B36',
          secondary: '#637381',
          disabled: '#919EAB',
        },
        error: {
          main: "#FA896B",
          light: "#FDEDE8",
          dark: "#f3704d",
          contrastText: "#ffffff",
        },
        warning: {
          main: "#FFAE1F",
          light: "#FEF5E5",
          dark: "#ae8e59",
          contrastText: "#ffffff",
        },
        grey: {
          100: "#F2F6FA",
          200: "#EAEFF4",
          300: "#DFE5EF",
          400: "#7C8FAC",
          500: "#5A6A85",
          600: "#2A3547",
        },
        divider: "#e5eaef",
        action: {
          disabledBackground: "rgba(73,82,88,0.12)",
          hoverOpacity: 0.02,
          hover: "#f6f9fc",
          active: "rgba(0, 0, 0, 0.54)",
          disabled: "rgba(0, 0, 0, 0.26)",
          disabledOpacity: 0.38,
          focus: "rgba(0, 0, 0, 0.12)",
          selectedOpacity: 0.08,
          activatedOpacity: 0.12,
        },
      }
    : {
        // dark mode palette
        primary: {
          light: "#C4E8FB",
          100: "#B1E0FA",
          200: "#8AD1F8",
          300: "#64C2F5",
          400: "#3EB3F3",
          main: "#17A3F1",
          dark: "#0D8CD2",
          700: "#0A699D",
          800: "#064668",
          contrastText: "#fff",
        },
        secondary: {
          A50: "#EBF3FE",
          A100: "#6610f2",
          A200: "#557fb9",
        },
        success: {
          main: '#86E8AB',
          light: '#BDECCF',
          dark: '#1B806A',
          contrastText: "#ffffff",
        },
        info: {
          main: '#61F3F3',
          light: '#ADFBFB',
          dark: '#006C9C',
          contrastText: "#ffffff",
        },
        error: {
          main: '#FF4842',
          light: '#FFA48D',
          dark: '#B72136',
          contrastText: "#ffffff",
        },
        warning: {
          main: '#FFB100',
          light: '#FFD666',
          dark: '#B77700',
          contrastText: "#ffffff",
        },
        grey: {
          100: '#161C24',
          200: '#212B36',
          300: '#454F5B',
          400: '#637381',
          500: '#919EAB',
          600: '#C4CDD5',
          700: '#DFE3E8',
          800: '#F4F6F8',
          900: '#F9FAFB',
        },
        divider: '#454F5B',
        action: {
          disabledBackground: "rgba(73,82,88,0.12)",
          hoverOpacity: 0.08,
          hover: "rgba(255, 255, 255, 0.08)",
          active: "rgba(255, 255, 255, 0.54)",
          disabled: "rgba(255, 255, 255, 0.26)",
          disabledOpacity: 0.38,
          focus: "rgba(255, 255, 255, 0.12)",
          selectedOpacity: 0.16,
          activatedOpacity: 0.24,
        },
      }),
    
});