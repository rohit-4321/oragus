import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../../../../schema/socket';

type ChatSliceState = {
  name: string,
  connectStatus: 'connected' | 'disconnected',
  lastRecipientName?: string,
  recipientState: {
    state: 'disconnected',
    reason: 'selfClose' | 'recipientClose' | 'idle'
  } | {
    state: 'connected'
    name: string,
  } | {
    state: 'loading'
  }
  message: IMessage[]
}

const initialState : ChatSliceState = {
  name: '',
  connectStatus: 'disconnected',
  recipientState: {
    state: 'disconnected',
    reason: 'idle',
  },
  message: [],
};
const chatSlice = createSlice({
  initialState,
  name: 'chat',
  reducers: {
    setName: (state, action:PayloadAction<string>) => {
      state.name = action.payload;
    },
    setConnectStatus: (state, action: PayloadAction<ChatSliceState['connectStatus']>) => {
      state.connectStatus = action.payload;
    },
    pushMessage: (state, action: PayloadAction<IMessage>) => {
      state.message.push(action.payload);
    },
    emptyMessageList: (state) => {
      state.message = [];
    },
    setRecipientState: (state, action: PayloadAction<ChatSliceState['recipientState']>) => {
      state.recipientState = action.payload;
      if (action.payload.state === 'connected') {
        state.lastRecipientName = action.payload.name;
      }
    },
  },
});

export const chatSliceAction = chatSlice.actions;
export default chatSlice;
