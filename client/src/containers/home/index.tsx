import React, { memo } from 'react';
import {
  Button, Paper, Stack, TextField, Typography,
} from '@mui/material';

import { chatSliceAction } from '../../redux/slices/chatSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const { setName } = chatSliceAction;
const Home = () => {
  const name = useAppSelector((state) => state.chat.name);
  const dispatch = useAppDispatch();
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setName(e.target.value));
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
