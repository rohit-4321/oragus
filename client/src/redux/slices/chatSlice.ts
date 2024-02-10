import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IChatTextMessage } from '../../../../schema';

export type ChatSliceState = {
  selfState: {
    name: string,
    isCaller?: boolean
  },
  connectStatus: 'connected' | 'disconnected',
  lastRecipientName?: string,
  recipientState: {
    state: 'disconnected',
    reason: 'selfClose' | 'recipientClose' | 'idle'
  } | {
    state: 'connected'
    name: string,
    isCaller: boolean
  } | {
    state: 'loading'
  }
  message: IChatTextMessage[]
}

const initialState : ChatSliceState = {
  selfState: {
    name: '',
    isCaller: undefined,
  },
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
      state.selfState.name = action.payload;
    },
    setSelfIsCallerState: (state, action: PayloadAction<boolean>) => {
      state.selfState.isCaller = action.payload;
    },
    setConnectStatus: (state, action: PayloadAction<ChatSliceState['connectStatus']>) => {
      state.connectStatus = action.payload;
    },
    pushMessage: (state, action: PayloadAction<IChatTextMessage>) => {
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
