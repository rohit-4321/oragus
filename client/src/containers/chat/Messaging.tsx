/* eslint-disable no-use-before-define */
import {
  Box, Button, Stack, TextField,
} from '@mui/material';
import { useState } from 'react';
import theme from '../../global/theme';

export const Messaging = () => {
  console.log('asdsd');
  return (
    <Stack height="100%">
      <Box
        overflow="auto"
        flex={1}
        px={1}
        pt={1}
      >
        <h1>asdasdsad</h1>
        <h1>asdasdsad</h1>
        <h1>asdasdsad</h1>
        <h1>asdasdsad</h1>
        <h1>asdasdsad</h1>
        <h1>asdasdsad</h1>
        <h1>asdasdsad</h1>
        <h1>asdasdsad</h1>
        <h1>asdasdsad</h1>
        <h1>asdasdsad</h1>
        <h1>asdasdsad</h1>
        <h1>asdasdsad</h1>
        <h1>asdasdsad</h1>
      </Box>
      <InputContainer />
    </Stack>
  );
};
const InputContainer = () => {
  const [message, setMessage] = useState('');
  return (
    <Stack px={1} py={1} direction="row" gap={1}>
      <TextField
        sx={{
          flex: '1',
          '& .Mui-focused > .MuiOutlinedInput-notchedOutline ': {
            borderColor: ` ${theme.palette.secondary.dark} !important`,
          },
        }}
        inputProps={{
          style: {
            fontWeight: 500,
          },
        }}
        placeholder="Enter Message ..."
        size="small"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="outlined">Send</Button>
    </Stack>
  );
};
