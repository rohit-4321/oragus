import {
  Box, Paper, Stack, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatWindow } from './right/ChatWindow';
import { useAppSelector } from '../../redux/hooks';

const Chat = () => {
  const userName = useAppSelector((state) => state.chat.name);
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const gap = useMemo(() => (isSmall ? theme.spacing(1) : theme.spacing(2)), [isSmall, theme]);

  useEffect(() => {
    if (!userName) {
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);
  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      padding: isSmall ? '0' : '8px',
    }}
    >
      <Stack
        sx={{
          height: '100%',
        }}
        gap={gap}
        direction={isSmall ? 'column' : 'row'}
      >
        <Paper
          sx={{
            flex: '3',
            minWidth: '300px',
            minHeight: isSmall ? '200px' : '100%',
          }}
          elevation={1}
        />
        <Paper
          sx={isSmall ? {
            height: `calc(100% - 200px - ${gap})`,
            backgroundColor: '#F1FFF4',
          } : {
            flex: '7',
            backgroundColor: '#F1FFF4',
          }}
          elevation={1}
        >
          <ChatWindow />
        </Paper>

      </Stack>
    </Box>
  );
};
export default Chat;
