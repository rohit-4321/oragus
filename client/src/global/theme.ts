/* eslint-disable linebreak-style */
import { createTheme } from '@mui/material';
import shadows from '@mui/material/styles/shadows';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#60d477',
      light: '#6DEC86',
      dark: '#58BD6C',
      contrastText: '#0d0e09',
    },
    secondary: {
      main: '#7560D4',
      light: '#826BEB',
      dark: '#6A57BE',
      contrastText: '#0d0e09',
    },
  },
  typography: {
    fontFamily: [
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
    ].join(','),
  },
  shadows: {
    ...shadows,
    1: '0px 0px 10px -4px rgba(0,0,0,0.1)',
  },
});
export default theme;
