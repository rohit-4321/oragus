import {
  GlobalStyles, ThemeProvider,
} from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import theme from './global/theme.ts';
import router from './routes/index.tsx';
import store from './redux/store.ts';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyles
          styles={{
            body: { backgroundColor: theme.palette.grey[100] },
          }}
        />
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
