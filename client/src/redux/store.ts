import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './slices/chatSlice';
import { socketMiddleware } from './middlewares/socketMiddleware';

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
  },
  middleware: (
    getDefaultMiddleware,
  ) => getDefaultMiddleware()
    .prepend(socketMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store;
