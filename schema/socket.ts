import {IChatMessage} from './messages_schema';

type OnJoinParams = {
  name: string,
  isCaller: boolean
}


export interface ServerToClientEvents {
  userJoin: (params: OnJoinParams) => void
  onMessage: (params: IChatMessage) => void
  userLeave: (param: unknown) => void
}


type RequestJoinParam = {
  userName: string
}

export interface ClientToServerEvents {
  requestJoin: (params: RequestJoinParam) => void
  message: (params: IChatMessage) => void
  requestLeave: () => void
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