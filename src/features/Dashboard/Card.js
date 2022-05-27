import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { truncateString } from '../../utils/truncateString';
import { Box } from '@mui/system';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { CardActionArea, Divider, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListOfUsers from './ListOfUsers';
import ListOfNextEvents from './ListOfNextEvents';
import { useDispatch } from 'react-redux';
import { changeCircle } from './../Circle/CircleSlice';

export default function CircleCard({
  name,
  img_url,
  admin_picture,
  admin_surname,
  desc,
  circle_id,
  nb_number,
  nb_online,
  nb_events,
  usersList,
  eventsList,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openMembers, setOpenMembers] = useState(false);

  const toggleMembers = () => {
    setOpenMembers(!openMembers);
  };
  const [openEvents, setOpenEvents] = useState(false);

  const toggleEvents = () => {
    setOpenEvents(!openEvents);
  };

  const redirect = (event) => {
    event.preventDefault();
    navigate('/circle/' + circle_id);
    dispatch(changeCircle({ circle_id, name, desc, img_url }));
  };

  return (
    <Card
      className='overflow-hidden rounded-xl relative min-w-full min-w-[300px] w-[300px] max-w-[300px] max-h-[360px]'
      sx={{ maxWidth: 345 }}
    >
      <CardActionArea onClick={redirect} href={'/circle/' + circle_id}>
        <Box className='relative'>
          <CardMedia
            className='h-24 custom-bk:h-[194px] '
            component='img'
            image={img_url}
            alt={name}
          />
          <Box className='absolute left-1/2 transform -translate-x-1/2 -bottom-5'>
            <Tooltip
              title={
                <Typography fontSize='1rem'>
                  {'Administrateur du cercle : ' + admin_surname}
                </Typography>
              }
              placement='top'
            >
              <Avatar
                src={admin_picture}
                sx={{ bgcolor: red[500], width: '50px', height: '50px' }}
                aria-label='recipe'
                alt='Admin picture'
              ></Avatar>
            </Tooltip>
            <svg
              className='absolute left-1/2 transform -translate-x-1/2 -bottom-2 z-[-1]'
              height='62'
              viewBox='0 0 144 62'
              width='144'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='m111.34 23.88c-10.62-10.46-18.5-23.88-38.74-23.88h-1.2c-20.24 0-28.12 13.42-38.74 23.88-7.72 9.64-19.44 11.74-32.66 12.12v26h144v-26c-13.22-.38-24.94-2.48-32.66-12.12z'
                fill='var(--background)'
                fillRule='evenodd'
              />
            </svg>
          </Box>
        </Box>
        <CardContent className='z-10 pt-8 flex flex-col gap-2 bg-darkybg'>
          <Typography className='text-lg custom-bk:text-2xl' component='h5'>
            {truncateString(name, 27)}
          </Typography>
          <Typography variant='body2' color='text.secondary grow'>
            {truncateString(desc, 45)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing className='bg-darkybg flex justify-between'>
        <Tooltip
          title={<Typography fontSize='1rem'>Membres du cercle</Typography>}
        >
          <IconButton className='text-lg' onClick={toggleMembers}>
            <PersonIcon className=' text-lg mr-2' /> {nb_number}
          </IconButton>
        </Tooltip>
        <Divider orientation='vertical' variant='middle' flexItem />
        <Tooltip
          title={
            <Typography fontSize='1rem'>Membres connectés du cercle</Typography>
          }
        >
          <IconButton aria-label='Numbers of connected' className='text-lg'>
            <Brightness1Icon
              className=' text-lg mr-2'
              color={`${nb_online === 0 ? 'error' : 'success'}`}
            />
            {nb_online}
          </IconButton>
        </Tooltip>
        <Divider orientation='vertical' variant='middle' flexItem />
        <Tooltip
          title={<Typography fontSize='1rem'>Prochains événements</Typography>}
        >
          <IconButton aria-label='List of events' className='text-lg' onClick={toggleEvents}>
            <EventIcon className=' text-lg mr-2' />
            {nb_events}
          </IconButton>
        </Tooltip>
      </CardActions>

      <ListOfUsers
        open={openMembers}
        onClose={toggleMembers}
        userList={usersList}
      />
      <ListOfNextEvents
        open={openEvents}
        onClose={toggleEvents}
        eventsList={eventsList}
      />
    </Card>
  );
}
