/* eslint-disable no-use-before-define */
import { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../../../../schema/socket';
import {
  onConnect, onDisConnect, onMessage, onUserJoin, onUserLeave,
} from './socketListeners';

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
