/* eslint-disable jsx-a11y/media-has-caption */
import { Box, Stack, useMediaQuery } from '@mui/material';
import { useRef, useEffect } from 'react';
import theme from '../../../global/theme/theme';

export const VideoWindow = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing the camera: ', err);
      }
    };

    getVideo();
  }, []);
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
          ref={videoRef}
          autoPlay
          playsInline
        />
      </Box>
      <Box flex={1}>
        <video
          style={{ width: '100%', height: '100%' }}
          ref={videoRef}
          autoPlay
          playsInline
        />
      </Box>

    </Stack>
  );
};
