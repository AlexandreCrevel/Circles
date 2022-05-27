import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeStorage } from '../../utils/helperLocalStorage';
import { handleToken } from '../auth/authSlice';
import { useGetUserDashBoardQuery } from '../Dashboard/DashboardApi';
import MiniDrawerList from './MiniDrawerList';
import logo from './../../logo.svg';
import './miniDrawer.scss';
import MiniDrawerDarkMode from './MiniDrawerDarkMode';
import { useGetProfilUserQuery } from '../ProfilePage/ProfilApi';

// MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Avatar,
  Collapse,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',

  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer({
  theme,
  setTheme,
  setOpen,
  open,
  handleToggleOpen,
}) {
  const disconnect = () => {
    dispatch(
      handleToken({
        token: '',
        user_id: '',
      })
    );
    removeStorage('token');
    removeStorage('user_id');
  };

  const [skip, setSkip] = useState(true);
  const [openCircleSubMenu, setOpenCircleSubMenu] = useState(false);
  const handleClickOnCircleSubMenu = () => {
    setOpenCircleSubMenu(!openCircleSubMenu);
  };

  const closeDrawer = () => {
    setOpen(false);
  };
  const { token, user_id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const theme = useTheme();

  const { data: circlesData } = useGetUserDashBoardQuery(
    {
      token,
      user_id,
    },
    {
      skip: skip,
    }
  );

  const { data: userData } = useGetProfilUserQuery(
    { token, user_id },
    {
      skip: skip,
    }
  );
  useEffect(() => {
    if (token !== null && user_id !== null) {
      setSkip(false);
    }
  }, [token, user_id]);
  return (
    <Box className='test' sx={{ display: 'flex' }}>
      <CssBaseline />
      <IconButton
        aria-label='Open drawer'
        className='z-10 drop-shadow-md'
        sx={{ position: 'fixed', left: '1rem', top: '1rem', boxShadow: 3 }}
        onClick={handleToggleOpen}
      >
        <MenuIcon />
      </IconButton>
      <Box id='menu'>
        <Drawer
          className={`Drawer__ui--custom ${
            open && 'Drawer__ui--open'
          } bg-buttonbg`}
          variant='permanent'
          open={open}
          onClose={closeDrawer}
        >
          <DrawerHeader>
            <IconButton aria-label='Close drawer' onClick={handleToggleOpen}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>

          <List id='menu_dashboard'>
            <MiniDrawerList
              name='Dashboard'
              icon={'Home'}
              url='/dashboard'
              open={open}
              handleToggleOpen={closeDrawer}
            />
          </List>
          <Divider variant='middle' />
          <List>
            <ListItemButton
              onClick={handleClickOnCircleSubMenu}
              id='menu_circles'
            >
              <ListItemIcon>
                <Avatar
                  alt='Circles logo'
                  src={logo}
                  sx={{ width: '1.5rem', height: '1.5rem' }}
                />
              </ListItemIcon>
              <ListItemText primary='Mes cercles' />
              {openCircleSubMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCircleSubMenu} timeout='auto'>
              {circlesData?.map((circle) => (
                <MiniDrawerList
                  key={circle.circle_id}
                  name={circle.name}
                  desc={circle.description}
                  img_url={circle.img_url}
                  circle_id={circle.circle_id}
                  open={open}
                  handleToggleOpen={closeDrawer}
                />
              ))}
            </Collapse>
          </List>
          <Divider variant='middle' />
          <List className='mt-auto'>
            <Box id='menu_faq'>
              <MiniDrawerList
                id='menu_faq'
                name='FAQ'
                icon={'FAQ'}
                url='/faq'
                open={open}
                handleToggleOpen={closeDrawer}
              />
            </Box>
            <Box id='menu_contact'>
              <MiniDrawerList
                name='Contact'
                url='/contact'
                icon={'Contact'}
                open={open}
                handleToggleOpen={closeDrawer}
              />
            </Box>
            <Box id='menu_profil'>
              <MiniDrawerList
                name='Mon compte'
                img_url={userData?.img_url}
                url='/profil'
                open={open}
                handleToggleOpen={closeDrawer}
              />
            </Box>
            <Divider variant='middle' />
            <Box id='menu_darkmode'>
              <MiniDrawerDarkMode
                setTheme={setTheme}
                theme={theme}
                open={open}
              />
            </Box>
            <Divider variant='middle' />
            <Box id='menu_disconnect'>
              <MiniDrawerList
                name='Se déconnecter'
                icon={'Disconnect'}
                url='/'
                open={open}
                handleToggleOpen={closeDrawer}
                click={disconnect}
              />
            </Box>
            <ListItemButton disabled>
              <ListItemIcon />
              <ListItemText
                disableTypography
                primary='©Circle - 2022'
                sx={{ fontSize: '12px' }}
              />
            </ListItemButton>
          </List>
        </Drawer>
      </Box>
    </Box>
  );
}
