import {
  Avatar,
  Grid,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { dateFormat } from '../../../utils/dateFormat';

export default function UserAnswer({ surname, time, text, img_url }) {
  return (
    <div>
      <ListItem key='1' className='p-1 pr-0'>
        <Grid
          container
          className='flex flex-nowrap column gap-4 justify-end items-center'
        >
          <Box>
            <Grid item xs={12}>
              <ListItemText align='right' primary={text}></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText
                disableTypography
                align='right'
                sx={{ fontSize: '.60rem' }}
              >
                {dateFormat(time)}
              </ListItemText>
            </Grid>
          </Box>
          <Tooltip title={<Typography fontSize='1rem'>{surname}</Typography>}>
            <Avatar alt={surname} src={img_url} />
          </Tooltip>
        </Grid>
      </ListItem>
    </div>
  );
}
