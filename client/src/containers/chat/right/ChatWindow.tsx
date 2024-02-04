/* eslint-disable no-use-before-define */
import {
  Box, Button, Stack, Typography,
} from '@mui/material';

import { MessageInput } from './MessageInput';
import { MessageItem } from './MessageItem';
import { Searching } from './Searching';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { requestJoinSocketAction, requestLeaveSocketAction } from '../../../redux/middlewares/actions';

export const ChatWindow = () => {
  const lastRecipientName = useAppSelector((state) => state.chat.lastRecipientName);
  const recipientState = useAppSelector((state) => state.chat.recipientState);
  const messages = useAppSelector((state) => state.chat.message);

  if (recipientState.state === 'loading') {
    return (
      <Stack height="100%" justifyContent="center" alignItems="center" gap={2}>
        <Searching />
      </Stack>
    );
  }
  return (
    <Stack height="100%">
      <ChatHeader />
      <Box
        overflow="auto"
        flex={1}
        px={1}
        pt={1}
      >
        <Stack gap={1} mb={1}>
          {
            messages.map((kl) => <MessageItem key={kl.id} message={kl} />)
          }
        </Stack>
        <Typography color={(theme) => theme.palette.grey[600]}>
          {
            recipientState.state === 'disconnected'
                && recipientState.reason === 'recipientClose'
                && lastRecipientName !== undefined
                && `${lastRecipientName} ended the conversation...`
          }
          {
            recipientState.state === 'disconnected'
                && recipientState.reason === 'selfClose'
                && lastRecipientName !== undefined
                && 'Conversation ended....'
          }

        </Typography>

      </Box>
      <MessageInput />
    </Stack>
  );
};

const ChatHeader = () => {
  const dispach = useAppDispatch();
  const recipientState = useAppSelector((state) => state.chat.recipientState);
  if (recipientState.state === 'loading') return null;

  const onJoin = () => {
    dispach(requestJoinSocketAction());
  };
  const onLeave = () => {
    dispach(requestLeaveSocketAction());
  };

  return (
    <Stack
      sx={{
        px: 1,
        py: 1,
        backgroundColor: 'white',
      }}
      direction="row"
      justifyContent="space-between"
    >
      {
        recipientState.state === 'disconnected'
          ? (
            <>
              <Typography />
              <Button onClick={onJoin}>Join</Button>
            </>
          ) : (
            <>
              <Typography>{recipientState.name}</Typography>
              <Button onClick={onLeave}>Leave</Button>
            </>
          )
      }

    </Stack>
  );
};
