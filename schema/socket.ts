import {IChatMessage} from './messages_schema';
export interface ServerToClientEvents {
  onMessage: (params: IChatMessage) => void
}

export interface ClientToServerEvents {
  message: (params: IChatMessage) => void
}
export interface ISocketData{
  id: string,
  userName: string,
  recipientId?: string,
  recipientUserName?: string,
  isCaller: boolean
}


export interface InterServerEvents {
  ping: () => void;
}