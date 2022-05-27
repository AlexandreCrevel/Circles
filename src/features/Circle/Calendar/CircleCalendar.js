import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

//CALENDRIER
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { fr } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment-timezone';
import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} from './CalendarApi';
import ModalEvent from './ModalEvent';
import { handleChange } from './CalendarSlice';
import CustomToolbar from './CustomToolBar';
// FIN CALENDRIER
const initialState = {
  title: null,
  start: moment().format('YYYY-MM-DD'),
  end: null,
  description: null,
  color: '#212B36',
  allday: false,
};
const locales = {
  fr: fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const CircleCalendar = ({
  CircleIsSuccess,
  circleIsLoading,
  circleData,
  profilData,
  user_id,
  circle_id,
  circleRefetch,
}) => {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const calendarControlled = useSelector((state) => state.calendar);
  const { token } = useSelector((state) => state.auth);
  const [eventId, setEventId] = useState(null);
  const [eventName, setEventName] = useState(null);
  useEffect(() => {
    circleData && setEvents(circleData.events);
  }, [circleData]);

  const { components } = useMemo(
    () => ({
      components: {
        toolbar: CustomToolbar,

        month: {
          header: ({ date, localizer }) => localizer.format(date, 'eee'),
        },
      },
    }),
    []
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();
  return (
    <div className='container-circle w-full  '>
      <Box
        id='calendar_circle'
        className='test1'
        style={{
          marginTop: '1rem',
          maxWidth: '1300px',
          margin: '0 auto',
        }}
      >
        <Box
          className='test2'
          sx={{
            '& > :not(style)': { m: 1 },
            marginTop: { xs: '1rem', lg: '8rem' },
          }}
        >
          <Fab
            sx={{
              color: 'var(--maincolor)',
              '&.MuiButtonBase-root': {
                backgroundColor: 'var(--subbackground)',
              },
            }}
            aria-label='add'
            variant='extended'
            onClick={() => {
              setEventName('create');
              handleOpen();
              for (const key in initialState) {
                dispatch(
                  handleChange({
                    name: key,
                    payload: initialState[key],
                  })
                );
              }
            }}
          >
            <AddIcon />
            Ajouter un évènement
          </Fab>
        </Box>
        <ModalEvent
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
          eventName={eventName}
          open={open}
          token={token}
          onClose={handleClose}
          createEvent={createEvent}
          calendarControlled={calendarControlled}
          circle_id={circle_id}
          user_id={user_id}
          circleRefetch={circleRefetch}
          eventId={eventId}
        />
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          popup={true}
          onSelectEvent={(e) => {
            setEventName('update');
            setEventId(e.id);
            handleOpen();
            for (const key in e) {
              dispatch(
                handleChange({
                  name: key,
                  payload: e[key],
                })
              );
            }
          }}
          style={{
            height: '50vh',
            width: '90%',
            margin: 'auto',
            boxShadow: '10px 10px 18px 0px rgba(0,0,0,0.2)',
          }}
          culture={'fr'}
          components={components}
          views={['month']}
        />
      </Box>
    </div>
  );
};
