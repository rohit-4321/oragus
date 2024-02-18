import { IChatMessage } from '../../../../schema';
import { chatSliceAction } from '../slices/chatSlice';
import store from '../store';

const {
  pushMessage,
  setRemoteIceCand,
  setRemoteDescription,
  setSelfIsCallerState,
  emptyMessageList,
  setRecipientState,
} = chatSliceAction;

export const chatMessageHandle = (mess: IChatMessage) => {
  if (mess.messageType === 'chat') {
    if (mess.content.contentType === 'text') {
      store.dispatch(pushMessage({
        ...mess.content.messageData,
        isSelf: false,
      }));
    }
  } else if (mess.messageType === 'rtc') {
    if (mess.content.contentType === 'rtcIceCandidate') {
      const cad = mess.content.data;
      if (!cad) {
        console.info('Ice Candidate from Remote Peer Missing');
        return;
      }
      store.dispatch(setRemoteIceCand(cad));
    }
    if (mess.content.contentType === 'rtcOffer') {
      const offer = mess.content.data;
      if (offer) {
        store.dispatch(setRemoteDescription(offer));
      } else {
        console.info('Remote offer empty');
      }
    }
    if (mess.content.contentType === 'rtcAnswer') {
      const answer = mess.content.data;
      if (answer) {
        store.dispatch(setRemoteDescription(answer));
      } else {
        console.info('Remote offer empty');
      }
    }
  } else if (mess.messageType === 'event') {
    if (mess.content.eventType === 'userJoin') {
      const recipientData = mess.content.data;
      store.dispatch(setRecipientState({
        state: 'connected',
        name: recipientData.name,
        isCaller: recipientData.isCaller,
      }));
      store.dispatch(setSelfIsCallerState(!recipientData.isCaller));
      store.dispatch(emptyMessageList());
    }
    if (mess.content.eventType === 'userLeave') {
      store.dispatch(setRecipientState({
        state: 'disconnected',
        reason: 'recipientClose',
      }));
    }
  }
};
