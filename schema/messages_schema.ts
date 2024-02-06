
export type IChatTextMessage = {
  isSelf: boolean,
  message: string,
  id: string
}

export type IChatMessage = {
  messageType: 'chat',
  content: {
    contentType: 'text',
    messageData: IChatTextMessage
  }
};
