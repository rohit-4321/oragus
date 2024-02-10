/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject } from 'react';
import { getSocket } from '../socketInit';
import { getRTCPeer } from './rtc';

/*
  Handling Ice Candidate
 */
function handleOnIceCandidate(ev: RTCPeerConnectionIceEvent) {
  const socket = getSocket();
  if (!socket) return;
  socket.emit('message', {
    messageType: 'rtc',
    content: {
      contentType: 'rtcIceCandidate',
      data: ev,
    },
  });
}

export function onIceCandidate() {
  const peer = getRTCPeer();
  if (!peer) return;
  peer.addEventListener('icecandidate', handleOnIceCandidate);
}
export function cleanUpIceCandidateListener() {
  const peer = getRTCPeer();
  if (!peer) return;
  peer.removeEventListener('icecandidate', handleOnIceCandidate);
}

/*
  Handling Negotiation Needed
  only caller use this
 */
function handleOnNegotiationNeeded() {
  const socket = getSocket();
  const peer = getRTCPeer();
  if (!peer || !socket) return;

  peer.createOffer()
    .then((offer) => {
      peer.setLocalDescription(offer);
      socket.emit('message', {
        messageType: 'rtc',
        content: {
          contentType: 'rtcOffer',
          data: peer.localDescription as RTCSessionDescription,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
export function onNegotiationNeeded() {
  const peer = getRTCPeer();
  if (!peer) return;
  peer.addEventListener('negotiationneeded', handleOnNegotiationNeeded);
}

export function cleanUpNegotiationNeededListener() {
  const peer = getRTCPeer();
  if (!peer) return;
  peer.removeEventListener('negotiationneeded', handleOnNegotiationNeeded);
}

let handleOnTrack: any = null;
export function onTrack(ref: RefObject<HTMLVideoElement>) {
  const peer = getRTCPeer();
  if (!peer) return;
  handleOnTrack = (event: any) => {
    if (ref.current && !ref.current.srcObject) {
      // eslint-disable-next-line prefer-destructuring
      ref.current.srcObject = event.streams[0];
    }
  };
  peer.addEventListener('track', handleOnTrack);
}

export function cleanUpOnTrack() {
  const peer = getRTCPeer();
  if (!peer || !handleOnTrack) return;
  peer.removeEventListener('track', handleOnTrack);
}
