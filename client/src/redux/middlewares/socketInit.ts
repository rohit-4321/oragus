/* eslint-disable no-use-before-define */
import { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../../../../schema/socket';
import { chatSliceAction } from '../slices/chatSlice';
import store from '../store';

const {
  setConnectStatus,
  pushMessage,
  setRecipientState,
  emptyMessageList,
} = chatSliceAction;

let socketInstance: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const socketInit = () => {
  if (socketInstance === null) {
    socketInstance = io('http://localhost:3000');
    socketInstance.on('connect', onConnect);
    socketInstance.on('disconnect', onDisConnect);
    onMessage(socketInstance);
    onUserJoin(socketInstance);
    onUserLeave(socketInstance);
  }
};
export const getSocket = () => socketInstance;

const onConnect = () => {
  store.dispatch(setConnectStatus('connected'));
};

const onDisConnect = () => {
  store.dispatch(setConnectStatus('disconnected'));
};

const onMessage = (socket:Socket<ServerToClientEvents, ClientToServerEvents>) => {
  socket.on('onMessage', (mes) => {
    store.dispatch(pushMessage({
      ...mes,
      isSelf: false,
    }));
  });
};
const onUserJoin = (socket:Socket<ServerToClientEvents, ClientToServerEvents>) => {
  socket.on('userJoin', (recipientData) => {
    store.dispatch(setRecipientState({
      state: 'connected',
      name: recipientData.name,
    }));
    store.dispatch(emptyMessageList());
  });
};

const onUserLeave = (socket:Socket<ServerToClientEvents, ClientToServerEvents>) => {
  socket.on('userLeave', () => {
    store.dispatch(setRecipientState({
      state: 'disconnected',
      reason: 'recipientClose',
    }));
  });
};
