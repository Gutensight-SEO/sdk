import { styled } from "@mui/material";

export const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize" as const,
}));

export const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

export const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize" as const,
  color: theme.palette.text.secondary,
}));

const typography = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Plus Jakarta Sans"',
  ].join(','),
  h1: {
    fontWeight: 600,
    fontSize: "2.25rem",
    lineHeight: "2.75rem",
  },
  h2: {
    fontWeight: 600,
    fontSize: "1.875rem",
    lineHeight: "2.25rem",
  },
  h3: {
    fontWeight: 600,
    fontSize: "1.5rem",
    lineHeight: "1.75rem",
  },
  h4: {
    fontWeight: 600,
    fontSize: "1.3125rem",
    lineHeight: "1.6rem",
  },
  h5: {
    fontWeight: 600,
    fontSize: "1.125rem",
    lineHeight: "1.6rem",
  },
  h6: {
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: "1.2rem",
  },
  navbar: {
    testCapitalize: "capitalize",
    textUpperCase: "uppercase",
    textLowerCase: "lowercase",
    fontWeight: 100,
  },
  button: {
    textTransform: "capitalize" as const,
    fontWeight: 400,
  },
  body1: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.334rem",
  },
  body2: {
    fontSize: "0.75rem",
    letterSpacing: "0rem",
    fontWeight: 400,
    lineHeight: "1rem",
  },
  subtitle1: {
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 400,
  },
};

export default typography;
