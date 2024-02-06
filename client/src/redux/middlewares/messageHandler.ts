import { IChatMessage } from '../../../../schema';
import { chatSliceAction } from '../slices/chatSlice';
import store from '../store';

const { pushMessage } = chatSliceAction;

export const chatMessageHandle = (mess: IChatMessage) => {
  if (mess.messageType === 'chat') {
    if (mess.content.contentType === 'text') {
      store.dispatch(pushMessage({
        ...mess.content.messageData,
        isSelf: false,
      }));
    }
  }
};
