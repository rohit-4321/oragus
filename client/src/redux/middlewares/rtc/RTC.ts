/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { RTC_SERVERS } from '../../../constant';

let rtcInstance: RTC | null = null;
export function getRTCInstance() {
  if (rtcInstance === null) {
    rtcInstance = new RTC();
    return rtcInstance;
  }
  return rtcInstance;
}

export class RTC {
  private peerConnection: RTCPeerConnection;

  private isMasterPeer: boolean = false;

  public tracks: RTCTrackEvent | null = null;

  constructor() {
    this.peerConnection = new RTCPeerConnection(RTC_SERVERS);
    this.peerConnection.ontrack = (ev) => {
      this.tracks = ev;
    };
  }

  initConnection(isMasterPeer: boolean = false) {
    if (this.peerConnection.connectionState === 'closed'
    || this.peerConnection.connectionState === 'disconnected') {
      this.peerConnection = new RTCPeerConnection(RTC_SERVERS);
      this.isMasterPeer = isMasterPeer;
    }
  }

  /* Master Create Offer For New Connection */
  async createMasterFirstOffer() {
    if (!this.isMasterPeer) {
      throw Error('Only Master Peer can create offer for connection');
    }
    if (this.peerConnection.signalingState === 'closed') {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      return this.peerConnection.localDescription;
    }
    throw Error(`cannot initiate offer with singnaling state ${this.peerConnection.signalingState}`);
  }

  /* Non Master received offer for New Connection */
  async handleConnectionOffer(offer: RTCSessionDescriptionInit) {
    if (!this.isMasterPeer) {
      if (this.peerConnection.signalingState === 'have-remote-offer') {
        throw Error('already have offer');
      }
      await this.peerConnection.setRemoteDescription(offer);
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      return this.peerConnection.localDescription;
    }
    throw Error('Master pper cannnot create answer');
  }

  /* Handle Answer For New Connection */
  async handleConnectionAnswer(answer: RTCSessionDescriptionInit) {
    if (!this.isMasterPeer) {
      throw Error('Only Master Peer can receive first answer for connection');
    }
    if (this.peerConnection.signalingState === 'have-local-offer') {
      this.peerConnection.setRemoteDescription(answer);
    }
  }

  /* Renegotiation */

  /* Common Function to both peer */
  addIceCandidate(iceCandidate: RTCIceCandidateInit | undefined) {
    this.peerConnection.addIceCandidate(iceCandidate);
  }

  onIceCandidate(
    callback: (param: RTCIceCandidateInit) => void,
  ) {
    this.peerConnection.onicecandidate = (cad) => {
      const { candidate } = cad;
      if (candidate) {
        callback(candidate.toJSON());
      }
    };
  }

  getTrack() {
    return this.tracks;
  }

  onTrack(callback: (params: RTCTrackEvent) => void) {
    this.peerConnection.ontrack = (ev) => {
      callback(ev);
    };
  }

  onClose() {
    this.peerConnection.close();
  }
}
