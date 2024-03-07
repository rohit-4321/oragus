/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { IChatMessage, OnJoinParams } from '../../../../schema';
import { chatSliceAction } from '../slices/chatSlice';
import store from '../store';
import { getRTCInstance } from './rtc/RTC';
import { getSMedia } from './rtc/SMedia';
import {
  sendIceCandidateSocketAction,
  sendRTCAnswerSocketAction,
  sendRTCOfferSocketAction,
  sendRTCRenegotiationAnswerSocketAction,
  sendRTCRenegotiationOfferSocketAction,
} from './socketActions';

const {
  pushMessage,
  setRemoteIceCand,
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
  }
  if (mess.messageType === 'rtc') {
    if (mess.content.contentType === 'rtcIceCandidate') {
      const cad = mess.content.data;
      if (!cad) {
        console.info('Ice Candidate from Remote Peer Missing');
        return;
      }
      const rtcInstance = getRTCInstance();
      rtcInstance.addIceCandidate(cad);
      store.dispatch(setRemoteIceCand(cad));
    }
    if (mess.content.contentType === 'rtcOffer') { handleRTCOffer(mess.content.data); }
    if (mess.content.contentType === 'rtcAnswer') { handleRTCAnswer(mess.content.data); }
    if (mess.content.contentType === 'rtcOffer-renegatiation') { handleRenegotiationRTCOffer(mess.content.data); }
    if (mess.content.contentType === 'rtcAnswer-renegatiation') { handleRenegotiationRTCAnswer(mess.content.data); }
  }
  if (mess.messageType === 'event') {
    if (mess.content.eventType === 'userJoin') {
      handleUserJoin(mess.content.data);
    }
    if (mess.content.eventType === 'userLeave') {
      store.dispatch(setRecipientState({
        state: 'disconnected',
        reason: 'recipientClose',
      }));
    }
  }
};

function handleRTCOffer(offer: RTCSessionDescriptionInit) {
  if (offer) {
    const rtcInstance = getRTCInstance();
    rtcInstance.initConnection(false);
    rtcInstance.onIceCandidate((candidate) => {
      store.dispatch(sendIceCandidateSocketAction(candidate));
    });
    rtcInstance.handleConnectionOffer(offer)
      .then((answer) => {
        if (answer) {
          store.dispatch(sendRTCAnswerSocketAction({
            type: answer.type,
            sdp: answer.sdp,
          }));
        } else {
          console.log('Answer in empty');
        }
      }).catch((err) => {
        console.log('Err', err);
      });
  } else {
    console.info('Remote offer empty');
  }
}
function handleRTCAnswer(answer: RTCSessionDescriptionInit) {
  if (answer) {
    const rtcInstance = getRTCInstance();
    rtcInstance.handleConnectionAnswer(answer);
    const sMedia = getSMedia();
    sMedia.getUserVideoStream()
      .then((mediaStream) => {
        mediaStream.getTracks().forEach(
          (track) => {
            rtcInstance.addTracks(track, mediaStream);
          },
        );
        rtcInstance.createRenegotiationOffer()
          .then((offer) => {
            if (offer) {
              store.dispatch(sendRTCRenegotiationOfferSocketAction({
                type: offer.type,
                sdp: offer.sdp,
              }));
            }
          }).catch((err) => {
            console.log('Reneogtiation Offer err', err);
          });
      })
      .catch((err) => {
        console.log('getUserVideoStream err', err);
      });

    // store.dispatch(setRemoteDescription(answer));
  } else {
    console.info('Remote offer empty');
  }
}

function handleUserJoin(data: OnJoinParams) {
  const recipientData = data;
  store.dispatch(setRecipientState({
    state: 'connected',
    name: recipientData.name,
    isCaller: recipientData.isCaller,
  }));
  store.dispatch(setSelfIsCallerState(!recipientData.isCaller));
  store.dispatch(emptyMessageList());

  if (!recipientData.isCaller) {
    const rtcInstance = getRTCInstance();
    rtcInstance.initConnection(!recipientData.isCaller);
    rtcInstance.onIceCandidate((candidate) => {
      store.dispatch(sendIceCandidateSocketAction(candidate));
    });
    rtcInstance.createMasterFirstOffer().then((offer) => {
      if (offer) {
        store.dispatch(sendRTCOfferSocketAction({
          type: offer.type,
          sdp: offer.sdp,
        }));
      } else {
        console.log('Offer in falsy');
      }
    }).catch((err) => {
      console.log('Errr', err);
    });
  }
}

function handleRenegotiationRTCOffer(offer: RTCSessionDescriptionInit) {
  if (offer) {
    const rtcInstance = getRTCInstance();
    const sStream = getSMedia();
    sStream.getUserVideoStream()
      .then((mediaStream) => {
        mediaStream.getTracks().forEach(
          (track) => {
            rtcInstance.addTracks(track, mediaStream);
          },
        );
        rtcInstance.handleRenegotiationOffer(offer)
          .then((answer) => {
            if (answer) {
              store.dispatch(sendRTCRenegotiationAnswerSocketAction({
                type: answer.type,
                sdp: answer.sdp,
              }));
            } else {
              console.log('Answer in empty');
            }
          }).catch((err) => {
            console.log('Err', err);
          });
      })
      .catch((err) => {
        console.log('getUserVideoStream err', err);
      });
  } else {
    console.info('Empty remote Offer');
  }
}
function handleRenegotiationRTCAnswer(answer: RTCSessionDescriptionInit) {
  if (answer) {
    const rtcInstance = getRTCInstance();
    rtcInstance.handleRenegotiationAnswer(answer);
  } else {
    console.info('Remote offer empty');
  }
}
