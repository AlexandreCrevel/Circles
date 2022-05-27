import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Grid, Modal, Slide, Typography } from '@mui/material';
import { format } from 'date-fns';
import './style.scss';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: '50%', xs: '80%' },
  textAlign: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '20px',
  backgroundColor: 'var(--subbackground)',
  color: 'var(--backgroundbutton)',
  p: 4,
};

export default function ListOfNextEvents({ open, onClose, eventsList }) {
  const arrayToSort = [...eventsList];
  const newArray = arrayToSort?.sort((a, b) =>
    moment(a?.start, 'DD-MM-YYYY').diff(moment(b?.start, 'DD-MM-YYYY'))
  );
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style} className='modal'>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '.8rem',
              textDecoration: 'underline',
            }}
          >
            Prochains événements
          </Typography>
          <Box>
            {newArray?.map((event, i) => {
              const now = moment().format('YYYY-MM-DD');
              const eventToCheck = moment(event?.start).format('YYYY-MM-DD');
              const isValid = eventToCheck > now ? event : null;
              if (isValid !== null) {
                return (
                  <Grid container key={i + Date.now()}>
                    <Typography
                      sx={{
                        fontSize: '.8rem',
                        alignSelf: 'center',
                        borderRight: { sm: '1px solid #000' },
                        width: '100px',
                      }}
                    >
                      {format(new Date(isValid.start), 'dd/MM/yyyy')}
                    </Typography>
                    <Typography sx={{ marginLeft: '15px' }}>
                      {isValid.title}
                    </Typography>
                  </Grid>
                );
              }
            })}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
