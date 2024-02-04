type OnJoinParams = {
  name: string
}

export type IMessage = {
  isSelf: boolean,
  message: string,
  id: string
}

export interface ServerToClientEvents {
  userJoin: (params: OnJoinParams) => void
  onMessage: (params: IMessage) => void
  userLeave: (param: unknown) => void
}


type RequestJoinParam = {
  userName: string
}

export interface ClientToServerEvents {
  requestJoin: (params: RequestJoinParam) => void
  message: (params: IMessage) => void
  requestLeave: () => void
}
export interface ISocketData{
  id: string,
  userName: string,
  recipientId?: string,
  recipientUserName?: string,
}


export interface InterServerEvents {
  ping: () => void;
}