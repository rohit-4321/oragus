import { Stack, TextField, Button } from '@mui/material';
import { useState } from 'react';
import theme from '../../../global/theme/theme';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { sendMessageSocketAction } from '../../../redux/middlewares/socketActions';

export const MessageInput = () => {
  const recipientState = useAppSelector((state) => state.chat.recipientState);
  const [message, setMessage] = useState('');
  const dispach = useAppDispatch();
  const onSend = () => {
    if (message) {
      dispach(sendMessageSocketAction(message));
      setMessage('');
    }
  };

  const SendButtonDisabled = !(recipientState.state === 'connected');
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
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            onSend();
          }
        }}
        placeholder="Enter Message ..."
        size="small"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="outlined" disabled={SendButtonDisabled} onClick={onSend}>Send</Button>
    </Stack>
  );
};
