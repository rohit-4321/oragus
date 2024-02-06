/* eslint-disable no-use-before-define */
import {
  Paper, Stack, Typography,
} from '@mui/material';
import { FC, memo } from 'react';
import { IChatTextMessage } from '../../../../../schema/messages_schema';

type MessageItemProps = {
    message: IChatTextMessage
}
export const MessageItem = memo(({ message }: MessageItemProps) => (
  message.isSelf
    ? <SelfChatMessage message={message} /> : <RecipientChatMessage message={message} />
));

const SelfChatMessage:FC<{
    message: IChatTextMessage
}> = ({ message }) => (
  <Stack justifyContent="center" alignItems="end">
    <Paper
      sx={(theme) => ({
        minWidth: '300px',
        maxWidth: '70%',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        px: 2,
        py: 1,
        borderRadius: 1,

      })}
      elevation={2}
    >
      <Typography fontFamily="monospace" fontWeight={100}>{message.message}</Typography>
    </Paper>
  </Stack>
);
const RecipientChatMessage:FC<{
    message: IChatTextMessage
}> = ({ message }) => (
  <Stack justifyContent="center" alignItems="start">
    <Paper
      sx={(theme) => ({
        minWidth: '300px',
        maxWidth: '40%',
        backgroundColor: theme.palette.grey[100],
        px: 2,
        py: 1,
        borderRadius: 1,
      })}
      elevation={2}
    >
      <Typography fontFamily="monospace" fontWeight={100}>{message.message}</Typography>
    </Paper>
  </Stack>
);
