import styled from '@emotion/styled';
import { createTheme } from '@mui/material/styles';

export const MuiThemeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#294154',
      contrastText: '#294154',
    },
    secondary: {
      main: '#EA8122',
      // dark: '#f1aa2a',
    },
  },
  typography: {
    fontFamily: [
      'easterFont',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
});

export const MuiThemeDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#EA8122',
    },
  },
  typography: {
    fontFamily: [
      'easterFont',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
});
