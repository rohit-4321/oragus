import React, { memo } from 'react';
import {
  Button, Paper, Stack, TextField, Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { chatSliceAction } from '../../redux/slices/chatSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const { setName } = chatSliceAction;
const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const name = useAppSelector((state) => state.chat.name);
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setName(e.target.value));
  };
  const onEnter = () => {
    navigate('/chat');
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
      <Paper elevation={1}>
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
            placeholder="Enter your name"
            value={name}
            onChange={onNameChange}
          />
          <Button
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
