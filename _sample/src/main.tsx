/** @format */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App.tsx';
import "gutensight"

import { store, persistor } from "./redux/app/store.ts";

import "@fontsource/roboto/100.css";
import "@fontsource/roboto/200.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";

// // Ensure components are globally registered
// if (typeof window !== 'undefined') {
//   customElements.define('gutensight-body', GutensightBody);
//   customElements.define('gutensight-title', GutensightTitle);
//   customElements.define('gutensight-description', GutensightDescription);
//   customElements.define('gutensight-keywords', GutensightKeywords);
// }


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
