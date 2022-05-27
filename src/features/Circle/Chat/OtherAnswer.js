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

export default function OtherAnswer({ surname, time, text, img_url }) {
  console.log(`🚀 ~ img_url`, img_url);
  return (
    <div>
      <ListItem key='2'>
        <Grid container className='flex column gap-4 justify-start '>
          <Box className='order-2'>
            <Grid className='w-fit' item xs={12}>
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
            <Avatar alt={surname} src={img_url} className='order-1' />
          </Tooltip>
        </Grid>
      </ListItem>
    </div>
  );
}
