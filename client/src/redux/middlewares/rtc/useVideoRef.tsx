import { useEffect, useRef } from 'react';
import { getRTCInstance } from './RTC';
import { getSMedia } from './SMedia';

export const useVideoRef = () => {
  const myStream = useRef<HTMLVideoElement>(null);
  const remoteStream = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    getSMedia().getUserVideoStream().then((mediaStream) => {
      if (myStream.current) {
        myStream.current.srcObject = mediaStream;
      }
    });
    const callback = (track: RTCTrackEvent | null) => {
      if (remoteStream.current && track) {
        // eslint-disable-next-line prefer-destructuring
        remoteStream.current.srcObject = track.streams[0];
      }
    };
    getRTCInstance()
      .tracks.attach(callback, true);

    return () => {
      // getRTCInstance().tracks.detach(callback);
    };
  }, []);
  return [myStream, remoteStream];
};
