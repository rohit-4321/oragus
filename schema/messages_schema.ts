
export type IChatTextMessage = {
  isSelf: boolean,
  message: string,
  id: string
}
export type IRtcIceCandidate = {
  messageType: 'rtc',
  content: {
    contentType: 'rtcIceCandidate',
    data: RTCIceCandidate | null

  }
}
export type IRtcOffer = {
  messageType: 'rtc',
  content: {
    contentType: 'rtcOffer',
    data: RTCSessionDescription

  }
}
export type IRtcAnswer = {
  messageType: 'rtc',
  content: {
    contentType: 'rtcAnswer',
    data: RTCSessionDescription

  }
}
export type IChatMessage = {
  messageType: 'chat',
  content: {
    contentType: 'text',
    messageData: IChatTextMessage
  }
} | IRtcIceCandidate | IRtcOffer | IRtcAnswer;
