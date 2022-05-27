import { Box, Container, IconButton, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import { handleChange } from './CircleSlice';
import { useWindowSize } from 'rooks';
export default function CircleHeader({
  circleData,
  toggleModify,
  toggleInvite,
}) {
  const { token } = useSelector((state) => state.auth);
  const { circle_id, menu } = useSelector((state) => state.circle);
  const dispatch = useDispatch();
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: '20%',
        width: '100% ',
        padding: { xs: '1rem', lg: '1rem' },
        paddingTop: { xs: '0vh', lg: '1rem' },
        marginBottom: { md: '3vh', lg: '10vh' },
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${circleData?.img_url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: '15vh', lg: '20vh' },
          borderRadius: '10px 10px 0 0 ',
          width: '100%',
        }}
      />
      <Paper
        style={{ backgroundColor: 'var(--background)' }}
        sx={{
          height: { xs: '5vh', lg: '80px' },
          borderRadius: '0 0 10px 10px ',
          // transform: 'translateX(-5px)',
          width: '100%',
          position: 'relative',
        }}
      >
        <Box
          id='begin_circle'
          sx={{
            position: 'absolute',
            top: '50%',
            left: { xs: '50%', md: '20%' },
            transform: 'translate(-50%,-50%)',
            gap: { xs: '0.5rem', md: '1rem' },
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Typography sx={{ fontSize: 'calc(1vw + 1vh + 1vmin)' }}>
            {circleData?.name}
          </Typography>
          <EditIcon
            sx={{ fontSize: 'calc(1vw + 1vh + -)', cursor: 'pointer' }}
            onClick={() => {
              toggleModify();
            }}
          />
        </Box>
        <Box
          id={innerWidth > 899 ? 'circle_chat_button' : ''}
          sx={{
            display: { xs: 'none', md: 'flex' },
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
            sx={{ cursor: 'pointer' }}
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
            sx={{ cursor: 'pointer' }}
          >
            Chat
          </Typography>
        </Box>
        <IconButton
          id='invite_circle'
          aria-label='invite button'
          onClick={() => toggleInvite()}
          sx={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <PersonAddIcon sx={{ fontSize: { xs: '1.5rem', lg: '2.5rem' } }} />
        </IconButton>
      </Paper>
    </Container>
  );
}
