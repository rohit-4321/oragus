/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { RTC_SERVERS } from '../../../constant';
import { Subject } from './Subject';

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

  public isMasterPeer: boolean = false;

  public tracks: Subject<RTCTrackEvent | null>;

  constructor() {
    this.peerConnection = new RTCPeerConnection(RTC_SERVERS);
    this.tracks = new Subject<RTCTrackEvent | null>(null);
  }

  initConnection(iamaster: boolean = false) {
    this.isMasterPeer = iamaster;
    if (this.peerConnection.connectionState === 'closed'
    || this.peerConnection.connectionState === 'disconnected'
    || this.peerConnection.connectionState === 'new') {
      this.peerConnection.ontrack = null;
      this.peerConnection = new RTCPeerConnection(RTC_SERVERS);
      this.peerConnection.ontrack = (ev) => {
        this.tracks.value = ev;
      };
    }
  }

  /* Master Create Offer For New Connection */
  async createMasterFirstOffer() {
    if (!this.isMasterPeer) {
      throw Error('Only Master Peer can create offer for connection');
    }
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    return this.peerConnection.localDescription;
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
  handleConnectionAnswer(answer: RTCSessionDescriptionInit) {
    if (!this.isMasterPeer) {
      throw Error('Only Master Peer can receive first answer for connection');
    }
    if (this.peerConnection.signalingState === 'have-local-offer') {
      this.peerConnection.setRemoteDescription(answer);
    }
  }

  /* Renegotiation */
  async createRenegotiationOffer() {
    // if (this.peerConnection.signalingState !== 'stable') {
    //   throw Error('Signaling State is not stable');
    // }
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    return this.peerConnection.localDescription;
  }

  async handleRenegotiationOffer(offer: RTCSessionDescriptionInit) {
    if (this.peerConnection.signalingState === 'have-remote-offer') {
      throw Error('already have offer');
    }
    await this.peerConnection.setRemoteDescription(offer);
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    return this.peerConnection.localDescription;
  }

  handleRenegotiationAnswer(answer: RTCSessionDescriptionInit) {
    if (this.peerConnection.signalingState === 'have-local-offer') {
      this.peerConnection.setRemoteDescription(answer);
    }
  }

  /* Common Function to both peer */
  addIceCandidate(iceCandidate: RTCIceCandidateInit | undefined) {
    if (this.peerConnection.remoteDescription) {
      this.peerConnection.addIceCandidate(iceCandidate);
    }
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

  addTracks(track: MediaStreamTrack, ...streams: MediaStream[]) {
    this.peerConnection.addTrack(track, ...streams);
  }

  getTrack() {
    return this.tracks;
  }

  // onTrack(callback: (params: RTCTrackEvent) => void) {
  //   this.peerConnection.ontrack = (ev) => {
  //     callback(ev);
  //   };
  // }

  onClose() {
    this.peerConnection.close();
    this.peerConnection.ontrack = null;
    this.peerConnection.onicecandidate = null;
    this.tracks.value = null;
    this.peerConnection.ontrack = null;
  }
}
