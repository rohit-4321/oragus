import React, { memo, useRef } from 'react';
import {
  IconButton,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import skyBackground from '../../../public/sky.jpg';
import { chatSliceAction } from '../../redux/slices/chatSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { requestJoinSocketAction } from '../../redux/middlewares/socketActions';
import { getSMedia } from '../../redux/middlewares/rtc/SMedia';

const { setName } = chatSliceAction;
const Home = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const name = useAppSelector((state) => state.chat.selfState.name);
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setName(e.target.value));
  };
  const onEnter = () => {
    if (name) {
      const mediaObject = getSMedia();
      mediaObject.getUserVideoStream()
        .then(() => {
          navigate('/chat');
          dispatch(requestJoinSocketAction());
        }).catch(() => {
          enqueueSnackbar('Unable To Open Camera', {
            preventDuplicate: true,
            variant: 'error',
            style: {
              fontFamily: 'sans-serif',
              fontSize: '1.1rem',
            },
          });
        });
    }
  };
  return (
    <div
      className="w-[100%] h-[100vh] flex justify-center bg-white"
    >
      <div className="flex-[2] relative overflow-hidden hidden md:block">
        {' '}
        {/* Add relative positioning here */}
        <img src={skyBackground} alt="backgroundImage" className="w-full h-full object-cover z-0" />
        <div className="absolute w-[80%] top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
          <h1 className=" font-serif  z-10 font-bold text-4xl  text-white text-center">
            Connect instantly with strangers worldwide through video and chat
          </h1>
          <p className="text-emerald-200 text-xl text-right mr-10">—meet someone new now!</p>
        </div>
      </div>
      <div className="flex-[3] flex items-center justify-center">
        <div className="w-[70%] border border-gray-300 rounded-lg bg-slate-100 shadow-md p-4">
          <h1 className="z-10 font-bold text-7xl text-green-500 mb-[10px] ">Oragus</h1>
          <p className="z-10 font-bold text-2xl text-gray-500 mb-[10px] ">What is your name so we can get started?</p>
          <div className="flex gap-1">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:outline-none focus:ring-green-300 block flex-1 p-2.5"
              placeholder="Enter your name"
              value={name}
              onChange={onNameChange}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  ev.preventDefault();
                  enterButtonRef.current?.focus();
                }
              }}
            />

            <IconButton
              ref={enterButtonRef}
              onClick={onEnter}
            >
              <ArrowForwardIcon />
            </IconButton>
          </div>
        </div>

      </div>
    </div>
  );
};
export default memo(Home);
