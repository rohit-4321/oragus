import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './slices/chatSlice';

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store;
