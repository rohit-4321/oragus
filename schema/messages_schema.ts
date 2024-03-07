
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
export type IRtcOfferRenegotiation = {
  messageType: 'rtc',
  content: {
    contentType: 'rtcOffer-renegatiation',
    data: RTCSessionDescriptionInit

  }
}
export type IRtcAnswerRenegotiation = {
  messageType: 'rtc',
  content: {
    contentType: 'rtcAnswer-renegatiation',
    data: RTCSessionDescriptionInit

  }
}

export type OnJoinParams = {
  name: string,
  isCaller: boolean
}
export type RequestJoinParam = {
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
} | IRtcIceCandidate | IRtcOffer | IRtcAnswer | IRtcOfferRenegotiation | IRtcAnswerRenegotiation | IEvent;
