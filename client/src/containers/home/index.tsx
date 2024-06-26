import React, { memo, useRef } from 'react';
import {
  Box, Button, Paper, Stack, TextField, Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
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
    <Stack
      sx={{
        width: '100%',
        height: '100vh',
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Paper elevation={1} variant="outlined">
        <Stack
          sx={{
            margin: '10px 15px',
          }}
          gap={2}
        >
          <Typography
            fontSize={30}
            fontWeight={700}
            fontFamily="sans-serif"
          >
            ORAGUS
          </Typography>
          <TextField
            size="small"
            onKeyDown={(ev) => {
              if (ev.key === 'Enter') {
                ev.preventDefault();
                enterButtonRef.current?.focus();
              }
            }}
            placeholder="Enter your name"
            value={name}
            onChange={onNameChange}
          />
          <Button
            ref={enterButtonRef}
            onClick={onEnter}
            variant="contained"
          >
            Enter
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};
export default memo(Home);
