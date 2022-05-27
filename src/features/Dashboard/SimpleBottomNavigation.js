import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import { BottomNavigationAction, Typography } from '@mui/material';

import './SimpleBottomNavigation.scss';
export default function SimpleBottomNavigation({
  handleClickOpenCreate,
  handleClickOpenJoin,
}) {
  return (
    <Box
      className='bottomNavigation'
      sx={{
        width: '100%',
        borderRadius: '15px',
        overflow: 'hidden',
        height: '70px',
        '@media (min-width:965px)': {
          position: 'absolute',
          top: '5rem',
          right: '2rem',
          width: '40%',
          maxWidth: '500px',
        },
      }}
    >
      <BottomNavigation className='h-full px-10' showLabels>
        <BottomNavigationAction
          id='circlecreate'
          label='Créer'
          icon={<AddCircleIcon />}
          onClick={() => {
            handleClickOpenCreate();
          }}
        />
        {/* <BottomNavigationAction
            label='Rejoindre'
            icon={<GroupsIcon />}
            onClick={() => {
              handleClickOpenJoin();
            }}
          /> */}
        <BottomNavigationAction
          label='Découvrir'
          icon={<SearchIcon />}
          onClick={() => {
            handleClickOpenJoin();
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
