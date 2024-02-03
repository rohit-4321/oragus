import {
  GlobalStyles, ThemeProvider,
} from '@mui/material';
import theme from './global/theme.ts';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: theme.palette.grey[100] },
        }}
      />
    </ThemeProvider>
  );
}

export default App;
