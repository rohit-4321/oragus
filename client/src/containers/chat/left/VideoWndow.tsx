/* eslint-disable jsx-a11y/media-has-caption */
import { Box, Stack, useMediaQuery } from '@mui/material';
import theme from '../../../global/theme/theme';
import { useVideoRef } from '../../../redux/middlewares/rtc/useVideoRef';

export const VideoWindow = () => {
  const [myStream, remoteStream] = useVideoRef();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack
      sx={{
        padding: 1,
        width: '100%',
        height: '100%',
      }}
      justifyContent="space-between"
      direction={isSmall ? 'row' : 'column'}
    >
      <Box flex={1}>
        <video
          style={{ width: '100%', height: '100%' }}
          ref={myStream}
          autoPlay
          // playsInline
        />
      </Box>
      <Box flex={1}>
        <video
          style={{ width: '100%', height: '100%' }}
          ref={remoteStream}
          autoPlay
          // playsInline
        />
      </Box>

    </Stack>
  );
};
