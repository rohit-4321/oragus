import {
  GlobalStyles, ThemeProvider,
} from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useLayoutEffect } from 'react';
import theme from './global/theme/theme.ts';
import router from './global/routes/index.tsx';
import store from './redux/store.ts';
import { socketInit } from './redux/middlewares/socketInit';
import { socketInitMessageListening, socketInitRequesJoinListener, socketInitRequestLeaveListener } from './redux/middlewares/socketActions.ts';

function App() {
  useLayoutEffect(() => {
    socketInit();
    const unsubMessageListener = socketInitMessageListening();
    const unsubRequestJoinListener = socketInitRequesJoinListener();
    const unsubRequestLeaveListener = socketInitRequestLeaveListener();

    return () => {
      unsubMessageListener({ cancelActive: true });
      unsubRequestLeaveListener({ cancelActive: true });
      unsubRequestJoinListener({ cancelActive: true });
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyles
          styles={{
            body: { backgroundColor: theme.palette.grey[200] },
            '*': {
              boxSizing: 'border-box',
            },
          }}
        />
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
