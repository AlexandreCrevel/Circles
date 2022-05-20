import { Box, Container, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { handleChange } from './CircleSlice';
export default function CircleHeader({ circleData }) {
  const { token } = useSelector((state) => state.auth);
  const { circle_id, menu } = useSelector((state) => state.circle);
  const dispatch = useDispatch();
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: '20%',
        width: '100% ',
        padding: '1rem',
        paddingTop: { xs: '0vh', lg: '1rem' },
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${circleData?.img_url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: {xs : '15vh',lg:'20vh'},
          borderRadius: '10px 10px 0 0 ',
          width: '100%',
        }}
      />
      <Paper
        style={{ backgroundColor: 'var(--background)' }}
        sx={{
          height:{xs: '5vh',lg:'80px'},
          borderRadius: '0 0 10px 10px ',
          // transform: 'translateX(-5px)',
          width: '100%',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: {xs:'50%',lg:'20%'},
            transform: 'translate(-50%,-50%)',
            gap: {xs:'0.5rem',lg:'1rem'},
            alignItems: 'center',
          }}
        >
          <Typography sx={{fontSize: 'calc(1vw + 1vh + 1vmin)'}}>{circleData?.name}</Typography>
          {/* <EditIcon sx={{fontSize: 'calc(1vw + 1vh + 1vmin)'}}/> */}
        </Box>
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '20%',
            gap: '3rem',
          }}
        >
          <Typography
            component='p'
            color='error'
            variant='h5'
            onClick={() => {
              dispatch(handleChange({ name: 'menu', payload: 'calendar' }));
            }}
          >
            Calendrier
          </Typography>
          <Typography
            component='p'
            color='error'
            variant='h5'
            onClick={() => {
              dispatch(handleChange({ name: 'menu', payload: 'chat' }));
            }}
          >
            Chat
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
