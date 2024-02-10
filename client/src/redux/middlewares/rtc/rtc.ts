import { RTC_SERVERS } from '../../../constant';

let rtcPeer: RTCPeerConnection | null = null;

export const getRTCPeer = () => rtcPeer;

export function initRtcPeer() {
  rtcPeer = new RTCPeerConnection(RTC_SERVERS);
}

export function closeRTCPeer() {
  rtcPeer?.close();
}

export function addTracks(localStream: MediaStream) {
  localStream.getTracks().forEach(
    (track) => { rtcPeer?.addTrack(track, localStream); },
  );
}
