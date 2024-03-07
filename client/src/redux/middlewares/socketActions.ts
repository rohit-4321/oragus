/* eslint-disable no-undef */
import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import chatSlice from '../slices/chatSlice';
import { getSocket } from './socketInit';
import { startAppListening } from './socketMiddleware';

const { pushMessage, setRecipientState } = chatSlice.actions;
const getActionName = (vl: string) => `socket/${vl}`;

/* Send Message Listener */
export const sendMessageSocketAction = createAction<string>(getActionName('sendMessage'));
export function socketInitMessageListening() {
  return startAppListening({
    actionCreator: sendMessageSocketAction,
    effect: (action, listenerApi) => {
      const socket = getSocket();
      const message = {
        id: uuidv4(),
        isSelf: true,
        message: action.payload,
      };
      listenerApi.dispatch(pushMessage(message));
      if (!socket) return;
      socket.emit('message', {
        messageType: 'chat',
        content: {
          contentType: 'text',
          messageData: message,
        },
      });
    },
  });
}

/* Request Join Listener */
export const requestJoinSocketAction = createAction(getActionName('requestJoin'));
export function socketInitRequesJoinListener() {
  return startAppListening({
    actionCreator: requestJoinSocketAction,
    effect: (_, listenerApi) => {
      const socket = getSocket();
      if (!socket) return;
      const { selfState: { name } } = listenerApi.getState().chat;
      if (name) {
        socket.emit('message', {
          messageType: 'event',
          content: {
            eventType: 'requestJoin',
            data: { userName: name },
          },
        });
        listenerApi.dispatch(setRecipientState({
          state: 'loading',
        }));
      }
    },
  });
}

/* Request Leave Listener */
export const requestLeaveSocketAction = createAction(getActionName('requestLeave'));
export function socketInitRequestLeaveListener() {
  return startAppListening({
    actionCreator: requestLeaveSocketAction,
    effect: (_, listenerApi) => {
      const socket = getSocket();
      if (!socket) return;
      socket.emit('message', {
        messageType: 'event',
        content: {
          eventType: 'requestLeave',
          data: null,
        },
      });
      listenerApi.dispatch(setRecipientState({
        state: 'disconnected',
        reason: 'selfClose',
      }));
    },
  });
}

/* Send Ice candidate */
export const sendIceCandidateSocketAction = createAction<RTCIceCandidateInit | null>(getActionName('sendIceCandidate'));
export function socketInitSendIceCandidateListener() {
  return startAppListening({
    actionCreator: sendIceCandidateSocketAction,
    effect: (action) => {
      const socket = getSocket();
      if (!socket) return;
      socket.emit('message', {
        messageType: 'rtc',
        content: {
          contentType: 'rtcIceCandidate',
          data: action.payload,
        },
      });
    },
  });
}

/* Send RTC Offer */
export const sendRTCOfferSocketAction = createAction<RTCSessionDescriptionInit>(getActionName('sendRTCOffer'));
export function socketInitSendRtcOfferListerner() {
  return startAppListening({
    actionCreator: sendRTCOfferSocketAction,
    effect: (action) => {
      const socket = getSocket();
      if (!socket) return;
      socket.emit('message', {
        messageType: 'rtc',
        content: {
          contentType: 'rtcOffer',
          data: action.payload,
        },
      });
    },
  });
}

/* Send RTC Answer */
export const sendRTCAnswerSocketAction = createAction<RTCSessionDescriptionInit>(getActionName('sendRTCAnswer'));
export function socketInitSendRtcAnswerListener() {
  return startAppListening({
    actionCreator: sendRTCAnswerSocketAction,
    effect: (action) => {
      const socket = getSocket();
      if (!socket) return;
      socket.emit('message', {
        messageType: 'rtc',
        content: {
          contentType: 'rtcAnswer',
          data: action.payload,
        },
      });
    },
  });
}

/* WebRTC Renegotiation Connection info */
export const sendRTCRenegotiationOfferSocketAction = createAction<RTCSessionDescriptionInit>(getActionName('sendRTCOfferrenegotiation'));
export function rtcOfferRenegotiationListener() {
  return startAppListening({
    actionCreator: sendRTCRenegotiationOfferSocketAction,
    effect: (action) => {
      const socket = getSocket();
      if (!socket) return;
      socket.emit('message', {
        messageType: 'rtc',
        content: {
          contentType: 'rtcOffer-renegatiation',
          data: action.payload,
        },
      });
    },
  });
}

export const sendRTCRenegotiationAnswerSocketAction = createAction<RTCSessionDescriptionInit>(getActionName('sendRTCAnswerrenegotiation'));
export function rtcAnswerRenotiation() {
  return startAppListening({
    actionCreator: sendRTCRenegotiationAnswerSocketAction,
    effect: (action) => {
      const socket = getSocket();
      if (!socket) return;
      socket.emit('message', {
        messageType: 'rtc',
        content: {
          contentType: 'rtcAnswer-renegatiation',
          data: action.payload,
        },
      });
    },

  });
}
