/** @format */
"use client";

import { useRoutes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Router } from "./navigation";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./middlewares/ErrorFallback";
import { CustomThemeProvider } from "./themes";
import './App.css'

function App() {
  const content = useRoutes(Router);

  return (
    <CustomThemeProvider>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {content}
      </ErrorBoundary>
    </CustomThemeProvider>
  );
}

export default App;
