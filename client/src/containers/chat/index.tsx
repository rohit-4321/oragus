import {
  Box, Paper, Stack, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { Messaging } from './Messaging';

const Chat = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const gap = useMemo(() => (isSmall ? theme.spacing(1) : theme.spacing(2)), [isSmall, theme]);
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
          } : {
            flex: '7',
          }}
          elevation={1}
        >
          <Messaging />
        </Paper>

      </Stack>
    </Box>
  );
};
export default Chat;
