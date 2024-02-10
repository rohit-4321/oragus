import { IChatMessage } from '../../../../schema';
import { chatSliceAction } from '../slices/chatSlice';
import store from '../store';

const { pushMessage, setRemoteIceCand, setRemoteDescription } = chatSliceAction;

export const chatMessageHandle = (mess: IChatMessage) => {
  console.log(mess);
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
      console.log('OFFER RECIECECE___________________________________________________>');
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
  }
};
