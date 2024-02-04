import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

export const Searching = () => {
  const [loadingDot, setLoadingDot] = useState('....');
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingDot((prev) => {
        const dotLength = (prev.split('').filter((c) => c === '.').length % 4) + 1;
        return '.'.repeat(dotLength) + ' '.repeat(4 - dotLength);
      });
    }, 200);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <Typography
      sx={{
        whiteSpace: 'pre',
      }}
      fontSize="1.4rem"
      color={(theme) => theme.palette.grey[700]}
    >
      Seaching
      {loadingDot}
    </Typography>
  );
};
