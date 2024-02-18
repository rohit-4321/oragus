
export type IChatTextMessage = {
  isSelf: boolean,
  message: string,
  id: string
}
export type IRtcIceCandidate = {
  messageType: 'rtc',
  content: {
    contentType: 'rtcIceCandidate',
    data: RTCIceCandidateInit | null

  }
}
export type IRtcOffer = {
  messageType: 'rtc',
  content: {
    contentType: 'rtcOffer',
    data: RTCSessionDescriptionInit

  }
}
export type IRtcAnswer = {
  messageType: 'rtc',
  content: {
    contentType: 'rtcAnswer',
    data: RTCSessionDescriptionInit

  }
}

type OnJoinParams = {
  name: string,
  isCaller: boolean
}
type RequestJoinParam = {
  userName: string
}
export type IEvent = {
  messageType: 'event',
  content: {
    eventType: 'userJoin',
    data: OnJoinParams
  } | {
    eventType: 'userLeave',
    data: unknown
  } | {
    eventType: 'requestJoin',
    data: RequestJoinParam
  } | {
    eventType: 'requestLeave',
    data: unknown
  }
}
export type IChatMessage = {
  messageType: 'chat',
  content: {
    contentType: 'text',
    messageData: IChatTextMessage
  }
} | IRtcIceCandidate | IRtcOffer | IRtcAnswer | IEvent;
