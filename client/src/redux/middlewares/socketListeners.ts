import { Socket } from 'socket.io-client';
import store from '../store';
import { chatMessageHandle } from './messageHandler';
import { chatSliceAction } from '../slices/chatSlice';
import { ClientToServerEvents, ServerToClientEvents } from '../../../../schema';

const {
  setConnectStatus,
  setRecipientState,
  emptyMessageList,
  setSelfIsCallerState,
} = chatSliceAction;
export const onConnect = () => {
  store.dispatch(setConnectStatus('connected'));
};

export const onDisConnect = () => {
  store.dispatch(setConnectStatus('disconnected'));
};

export const onMessage = (socket:Socket<ServerToClientEvents, ClientToServerEvents>) => {
  socket.on('onMessage', chatMessageHandle);
};

export const onUserJoin = (socket:Socket<ServerToClientEvents, ClientToServerEvents>) => {
  socket.on('userJoin', (recipientData) => {
    store.dispatch(setRecipientState({
      state: 'connected',
      name: recipientData.name,
      isCaller: recipientData.isCaller,
    }));
    store.dispatch(setSelfIsCallerState(!recipientData.isCaller));
    store.dispatch(emptyMessageList());
  });
};

export const onUserLeave = (socket:Socket<ServerToClientEvents, ClientToServerEvents>) => {
  socket.on('userLeave', () => {
    store.dispatch(setRecipientState({
      state: 'disconnected',
      reason: 'recipientClose',
    }));
  });
};
