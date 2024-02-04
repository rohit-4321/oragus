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
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,

      },
    },
    MuiButton: {
      defaultProps: {
      },
      styleOverrides: {
        root: {
          ':hover': {
            boxShadow: 'none',
          },
        },
        disableElevation: true,
        disabled: true,
      },
    },
  },
  typography: {
    fontFamily: [
      'Roboto Mono',
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 950,
      lg: 1200,
      xl: 1536,
    },
  },
  shadows: {
    ...shadows,
    1: '0px 0px 10px -4px rgba(0,0,0,0.1)',
  },
});
export default theme;
