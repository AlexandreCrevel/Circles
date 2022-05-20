import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import {
  Button,
  DialogActions,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import {
  DatePicker,
  DateTimePicker,
  DesktopDateTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { handleChange } from './CalendarSlice';
import { useParams } from 'react-router';
import { useGetUserDashBoardQuery } from '../../Dashboard/DashboardApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vh',
  backgroundColor: '#1A2027',
  // bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '20px',
  p: 4,
  height: '60vh',
  padding: '2rem',
};
export default function ModalEvent({
  open,
  onClose,
  createEvent,
  calendarControlled,
  user_id,
  token,
  circleRefetch,
  eventId,
  eventName,
  updateEvent,
  deleteEvent,
}) {
  const dispatch = useDispatch();
  const { circle_id } = useParams();
  const [valid, setValid] = useState(false);

  const openValid = () => {
    setValid(true);
  };
  const closeValid = () => {
    setValid(false);
  };
  const [startDate, setStartDate] = useState(
    new Date('2018-01-01 00:00:00.000Z')
  );
  const [endDate, setEndDate] = useState(new Date('2018-01-01 00:00:00.000Z'));

  const [skip, setSkip] = useState(true);
  const { refetch: dashDataRefretch } = useGetUserDashBoardQuery(
    {
      token,
      user_id,
    },
    {
      skip: skip,
    }
  );
  useEffect(() => {
    if (token !== null && user_id !== null) setSkip(false);
  }, [token]);
  return (
    <>
      <Box>
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box
            sx={style}
            component='form'
            onSubmit={async (e) => {
              e.preventDefault();
              // const newObj = await { ...calendarControlled };
              // for (const key in newObj) {
              //   if (newObj[key] === '' || null) {
              //     delete newObj[key];
              //   }
              // }
              if (eventName === 'create') {
                await createEvent({
                  ...calendarControlled,
                  circle_id,
                  user_id,
                  token,
                });
              } else {
                await updateEvent({
                  ...calendarControlled,
                  circle_id,
                  user_id,
                  token,
                  event_id: eventId,
                });
              }
              circleRefetch();
              dashDataRefretch();
              onClose();
            }}
          >
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              {eventName === 'create'
                ? 'Ajouter un événement'
                : 'Modifier un évènement'}
            </Typography>
            <TextField
              autoFocus
              required
              margin='dense'
              id='title'
              label='Titre'
              type='text'
              value={calendarControlled.title}
              fullWidth
              variant='standard'
              sx={{ color: 'red' }}
              onChange={(event) => {
                dispatch(
                  handleChange({
                    name: 'title',
                    payload: event.target.value,
                  })
                );
              }}
            />
            {eventName === 'create' ? (
              ''
            ) : (
              <DeleteIcon
                onClick={() => setValid(true)}
                color='error'
                sx={{ position: 'absolute', top: '2rem', right: '2rem' }}
              />
            )}

            <TextField
              autoFocus
              required
              margin='dense'
              id='description'
              label='Description'
              multiline
              rows={4}
              value={calendarControlled.description}
              type='text'
              fullWidth
              variant='standard'
              sx={{ color: 'red' }}
              onChange={(event) => {
                dispatch(
                  handleChange({
                    name: 'description',
                    payload: event.target.value,
                  })
                );
              }}
            />
            <FormGroup>
              <FormControlLabel
                control={<Switch />}
                label='Toute la journée'
                onChange={(event) => {
                  // const [date] = event.toISOString().split('GMT');
                  // const formatDate = moment(date)
                  //   .tz('Europe/Paris')
                  //   .format('YYYY-MM-DD HH:mm:ss');
                  dispatch(
                    handleChange({
                      name: 'allday',
                      payload: event.target.checked,
                    })
                  );
                }}
              />
            </FormGroup>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                {calendarControlled?.allday === false ? (
                  <DateTimePicker
                    value={calendarControlled.start}
                    label='Start event : '
                    onChange={(event) => {
                      const [date] = event.toISOString().split('GMT');
                      const formatDate = moment(date)
                        .tz('Europe/Paris')
                        .format('YYYY-MM-DD HH:mm:ss');
                      dispatch(
                        handleChange({
                          name: 'start',
                          payload: formatDate,
                        })
                      );
                    }}
                    renderInput={(props) => <TextField {...props} />}
                  />
                ) : (
                  <DatePicker
                    // mask='mm'
                    value={calendarControlled.start}
                    format='yyyy-mm-dd'
                    label='Start event : '
                    onChange={(event) => {
                      const [date] = event.toISOString().split('GTM');
                      const formatDate = moment(date)
                        .tz('Europe/Paris')
                        .format('YYYY-MM-DD');
                      dispatch(
                        handleChange({
                          name: 'start',
                          payload: formatDate,
                        })
                      );
                      dispatch(
                        handleChange({
                          name: 'end',
                          payload: formatDate,
                        })
                      );
                    }}
                    renderInput={(props) => <TextField {...props} />}
                  />
                )}

                <DateTimePicker
                  disabled={calendarControlled?.allday === true ? true : false}
                  label='End event : '
                  required
                  value={calendarControlled.end}
                  onChange={(event) => {
                    const [date] = event.toISOString().split('GMT');
                    const formatDate = moment(date)
                      .tz('Europe/Paris')
                      .format('YYYY-MM-DD HH:mm:ss');
                    dispatch(
                      handleChange({
                        name: 'end',
                        payload: formatDate,
                      })
                    );
                  }}
                  renderInput={(props) => <TextField {...props} />}
                />
              </Stack>
            </LocalizationProvider>
            <TextField
              autoFocus
              required
              margin='dense'
              id='name'
              label='Couleur de votre cercle'
              type='color'
              defaultValue='#212B36'
              fullWidth
              variant='standard'
              onChange={(event) => {
                dispatch(
                  handleChange({
                    name: 'color',
                    payload: event.target.value,
                  })
                );
              }}
            />
            <DialogActions>
              <Button onClick={onClose}>Retour</Button>
              <Button type='submit'>
                {eventName === 'create' ? 'Créer' : 'Mise à jour'}
              </Button>
            </DialogActions>
          </Box>
        </Modal>
      </Box>
      <Dialog
        open={valid}
        onClose={closeValid}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Supprimer cet évènement ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            L'entièreté de l'évènement sera supprimé.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={closeValid}>
            Retour
          </Button>
          <Button
            color='error'
            onClick={async (e) => {
              e.preventDefault();
              await deleteEvent({
                circle_id,
                token,
                user_id,
                event_id: eventId,
              });
              circleRefetch();
              onClose();
              closeValid();
            }}
            autoFocus
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
