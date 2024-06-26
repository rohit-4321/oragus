import { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../../../../schema/socket';
import {
  onConnect, onDisConnect, onMessage,
} from './socketListeners';

let socketInstance: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const socketInit = () => {
  if (socketInstance === null) {
    socketInstance = io('ws://localhost:3000');
    socketInstance.on('connect', onConnect);
    socketInstance.on('disconnect', onDisConnect);
    socketInstance.on('connect_error', (err) => {
      console.error('Socket Connect Error: ', err);
    });
    onMessage(socketInstance);
  }
};
export const getSocket = () => socketInstance;
