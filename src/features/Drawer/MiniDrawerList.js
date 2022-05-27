import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeCircle } from '../Circle/CircleSlice';

// MUI Components
import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Typography } from '@mui/material';

// MUI Icons
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LogoutIcon from '@mui/icons-material/Logout';
import CancelIcon from '@mui/icons-material/Cancel';

export default function MiniDrawerList({
  name,
  desc,
  circle_id,
  url,
  open,
  img_url,
  icon,
  click,
  handleToggleOpen,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = (event) => {
    event.preventDefault();
    if (url) {
      navigate(url);
    } else {
      navigate('/circle/' + circle_id);
      dispatch(changeCircle({ circle_id, name, desc, img_url }));
    }
  };

  let compIcon = '';
  switch (icon) {
    case 'Home':
      compIcon = <HomeIcon />;
      break;
    case 'FAQ':
      compIcon = <HelpIcon />;
      break;
    case 'Contact':
      compIcon = <QuestionAnswerIcon />;
      break;
    case 'Disconnect':
      compIcon = <LogoutIcon />;
      break;
    default:
      compIcon = <CancelIcon />;
  }

  return (
    <ListItem
      key={name}
      disablePadding
      sx={{ display: 'block' }}
      onClick={redirect}
    >
      <Tooltip
        title={<Typography fontSize='1rem'>{name}</Typography>}
        placement='right'
      >
        <ListItemButton
        aria-label='List of circles'
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          onClick={() => {
            handleToggleOpen();
            click && click();
          }}
        >
          <ListItemIcon
          alt='Circles icon'
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {img_url ? (
              <Avatar
                alt={name}
                className='w-6 h-6 rounded-full MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root'
                src={img_url}
              />
            ) : icon ? (
              <ListItemIcon
                sx={{
                  width: '1.5rem',
                  height: '1.5rem',
                  mr: 0,
                    // justifyContent: open ? 0 : 'center',

                }}
              >
                {compIcon}
              </ListItemIcon>
            ) : (
              ''
            )}
          </ListItemIcon>
          <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        {/* </NavLink> */}
      </Tooltip>
    </ListItem>
  );
}
