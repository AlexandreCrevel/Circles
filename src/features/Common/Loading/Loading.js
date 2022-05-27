import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
export const Loading = () => {
  return (
    <Box
      className='loading'
      sx={{
        position: 'fixed',
        top: '0',
        left: '0',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size='15rem' />
    </Box>
  );
};
