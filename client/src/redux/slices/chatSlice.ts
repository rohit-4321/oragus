import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ChatSliceState = {
  name: string
}

const initialState : ChatSliceState = {
  name: '',
};
const chatSlice = createSlice({
  initialState,
  name: 'chat',
  reducers: {
    setName: (state, action:PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const chatSliceAction = chatSlice.actions;
export default chatSlice;
