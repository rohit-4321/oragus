import { Socket } from 'socket.io-client';
import store from '../store';
import { chatMessageHandle } from './messageHandler';
import { chatSliceAction } from '../slices/chatSlice';
import { ClientToServerEvents, ServerToClientEvents } from '../../../../schema';

const { setConnectStatus } = chatSliceAction;
export const onConnect = () => {
  store.dispatch(setConnectStatus('connected'));
};

export const onDisConnect = () => {
  store.dispatch(setConnectStatus('disconnected'));
};

export const onMessage = (socket:Socket<ServerToClientEvents, ClientToServerEvents>) => {
  socket.on('onMessage', chatMessageHandle);
};
