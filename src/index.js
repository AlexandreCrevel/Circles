import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import App from './app/App';
import { StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <App />
      </StyledEngineProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
