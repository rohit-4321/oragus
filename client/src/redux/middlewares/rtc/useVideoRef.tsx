import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RTC_SERVERS } from '../../../constant';
import { sendIceCandidateSocketAction, sendRTCOfferSocketAction, sendRTCAnswerSocketAction } from '../socketActions';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
let pc: RTCPeerConnection | null = null;
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
let mediaStream: MediaStream | null = null;
export const useVideoRef = () => {
  const dispatch = useAppDispatch();
  const isCaller = useAppSelector((state) => state.chat.selfState.isCaller);
  const remoteIceCad = useAppSelector((state) => state.chat.remoteIceCand);
  const remoteDescription = useAppSelector((state) => state.chat.remoteDescription);
  const myStream = useRef<HTMLVideoElement>(null);
  const remoteStream = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (pc) {
      pc.addIceCandidate(remoteIceCad === null ? undefined : remoteIceCad);
    }
  }, [remoteIceCad]);

  useEffect(() => {
    const setMedia = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (myStream.current && !myStream.current.srcObject) {
          mediaStream.getTracks().forEach(
            (track) => {
              if (pc && mediaStream) {
                pc.addTrack(track, mediaStream);
              }
            },
          );
          myStream.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Camera Error', err);
      }
    };
    const handleDescriptRecieved = async () => {
      if (remoteDescription) {
        if (remoteDescription.type === 'offer') {
          console.log('Calleee');
          pc = new RTCPeerConnection(RTC_SERVERS);
          pc.ontrack = (ev) => {
            if (remoteStream.current && !remoteStream.current.srcObject) {
              // eslint-disable-next-line prefer-destructuring
              remoteStream.current.srcObject = ev.streams[0];
            }
          };
          pc.onicecandidate = (iceCand) => {
            dispatch(sendIceCandidateSocketAction(iceCand.candidate));
          };
          try {
            await pc.setRemoteDescription(remoteDescription);
            await setMedia();
            const ans = await pc.createAnswer();
            await pc.setLocalDescription(ans);
          } catch (err) {
            console.error('In APP: Problem in creating answer', err);
          }
          const localDes = pc.localDescription;
          if (localDes) {
            dispatch(sendRTCAnswerSocketAction(localDes));
          } else {
            console.error('IN APP: answer in local description in empty');
          }
        }
      }

      if (pc && remoteDescription?.type === 'answer') {
        pc.setRemoteDescription(remoteDescription);
      }
    };
    handleDescriptRecieved();
  }, [remoteDescription, dispatch]);

  useEffect(() => {
    const setMedia = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (myStream.current && !myStream.current.srcObject) {
          mediaStream.getTracks().forEach(
            (track) => {
              if (pc && mediaStream) {
                console.log('Putting track--->>>>>>>>>>>');
                pc.addTrack(track, mediaStream);
              }
            },
          );
          myStream.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Camera Err', err);
      }
    };
    const init = async () => {
      if (isCaller) {
        console.log('Caller');
        pc = new RTCPeerConnection(RTC_SERVERS);
        pc.onicecandidate = (iceCand) => {
          dispatch(sendIceCandidateSocketAction(iceCand.candidate));
        };
        pc.ontrack = (ev) => {
          if (remoteStream.current && !remoteStream.current.srcObject) {
            console.log('Caller remote media set->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.');

            // eslint-disable-next-line prefer-destructuring
            remoteStream.current.srcObject = ev.streams[0];
          }
        };
        await setMedia();
        pc.onnegotiationneeded = async () => {
          if (pc) {
            try {
              const offer = await pc.createOffer();

              await pc.setLocalDescription(offer);
              const localDes = pc.localDescription;
              if (localDes) {
                dispatch(sendRTCOfferSocketAction(localDes));
              } else {
                console.error('Local Description of caller in empty');
              }
            } catch (err) {
              console.error('In APP: Error in creating Offer', err);
            }
          }
        };
      }
    };
    init();
    return () => {
      if (pc) {
        pc.close();
        pc.onicecandidate = null;
        pc.onnegotiationneeded = null;
        pc.ontrack = null;
        pc = null;
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [isCaller, dispatch]);

  return [myStream, remoteStream];
};
