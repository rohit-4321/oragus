type OnJoinParams = {
  name: string
}

type Message = {
  isSelf: boolean,
  message: string,
  id: string
}

export interface ServerToClientEvents {
  userJoin: (params: OnJoinParams) => void
  onMessage: (params: Message) => void
  userLeave: () => void
}


type RequestJoinParam = {
  userName: string
}

export interface ClientToServerEvents {
  requestJoin: (params: RequestJoinParam) => void
  message: (params: Message) => void
  requestLeave: () => void
}
export interface ISocketData{
  id: string,
  userName: string,
  recipientId: string,
  recipientUserName: string,
}


export interface InterServerEvents {
  ping: () => void;
}