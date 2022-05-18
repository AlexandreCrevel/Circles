import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
//CALENDRIER
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { fr } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import moment from 'moment-timezone';
import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} from '../Circle/Calendar/CalendarApi';
import ModalEvent from '../Circle/Calendar/ModalEvent';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { handleChange } from '../Circle/Calendar/CalendarSlice';
// import CustomToolbar from './CustomToolBar';
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

// const events = [
//   {
//     title: 'Strip Tease Aleks',
//     start: new Date(2022, 4, 7),
//     end: new Date(2022, 4, 7),
//   },
//   {
//     title: 'Anniversaire Tati Daniele',
//     start: new Date(2022, 4, 20),
//     end: new Date(2022, 4, 22),
//   },
//   {
//     title: 'Anniversaire Tonton Gudule',
//     start: new Date(2022, 4, 20),
//     end: new Date(2022, 4, 21),
//   },
// ];
export const CirclePage = ({
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

  const MyEventWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'red',
      },
    });
  // Event Wrapper = comme son nom l'indique,
  // concerne le contenant de l'event rajouté

  const MyEventContainerWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'coral',
        color: 'green',
      },
    });
  // pour la vue week/day,
  // inutile pour la vue mensuelle

  const MyDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'lightblue',
        color: 'red',
      },
    });
  // Date Cell Wrapper = case du calendrier en vue mensuelle

  const MyTimeSlotWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'red',
        color: 'green',
      },
    });
  //Touche les cases horaires de la vue week/day

  const MyTimeGutterWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'lightblue',
        color: 'green',
      },
    });
  // Fait planter la vue ?

  const MyResourceHeader = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'yellow',
        color: 'green',
      },
    });
  //Inconnu au bataillon

  const MyToolbar = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      toolbar: false,
    });
  // Fait planter la vue ?

  const MyAgendaEvent = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'yellow',
        color: 'green',
      },
    });
  // Fait planter la vue ?

  const MyAgendaTime = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'yellow',
        color: 'green',
      },
    });
  // Fait planter la vue ?

  const MyAgendaDate = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'lightblue',
        color: 'green',
      },
    });
  // Fait planter la vue ?

  const MyDayHeader = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'yellow',
        color: 'green',
      },
    });
  // Fait planter la vue ?

  const MyDayEvent = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'yellow',
        color: 'green',
      },
    });
  // Inconnu au bataillon ?

  const MyWeekHeader = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'yellow',
        color: 'green',
      },
    });
  // Fait planter la vue ?

  const MyWeekEvent = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'yellow',
        color: 'green',
      },
    });
  // Fait planter la vue ?

  const MyMonthHeader = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'yellow',
        color: 'green',
      },
    });
  // Fait planter la vue ?

  const MyMonthDateHeader = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'lightblue',
        color: 'green',
      },
    });
  // Fait planter la vue ?

  const MyMonthEvent = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'lightblue',
        color: 'green',
      },
    });
  // Fait planter la vue ?
  console.log(`üöÄ ~ circleIsLoading`, circleIsLoading);

  const { components } = useMemo(
    () => ({
      components: {
        // event: MyEvent, // Fait planter la vue ?
        eventWrapper: MyEventWrapper,
        eventContainerWrapper: MyEventContainerWrapper,
        dateCellWrapper: MyDateCellWrapper,
        timeSlotWrapper: MyTimeSlotWrapper,
        // timeGutterHeader: MyTimeGutterWrapper, // Fait planter la vue ?
        resourceHeader: MyResourceHeader, //Inconnu au bataillon ?
        // toolbar: CustomToolbar, // Fait planter la vue ?
        // agenda: {
        //   event: MyAgendaEvent, // Fait planter la vue ?
        //   time: MyAgendaTime,// Fait planter la vue ?
        // date: MyAgendaDate, // Fait planter la vue ?
        // },
        day: {
          // header: MyDayHeader, // Fait planter la vue ?
          event: MyDayEvent, // Inconnu au bataillon ?
        },
        week: {
          //   header: MyWeekHeader, // Fait planter la vue ?
          //   event: MyWeekEvent, // Fait planter la vue ?
        },
        month: {
          //   header: MyMonthHeader, // Fait planter la vue ?
          //   dateHeader: MyMonthDateHeader, // Fait planter la vue ?
          //   event: MyMonthEvent, // Fait planter la vue ?
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
    <div className='container-circle w-full'>
      
      <Box style={{ marginTop: '5rem' }}>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Button
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
          </Button>
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
          style={{ height: '30rem', width: '90%', margin: 'auto' }}
          culture={'fr'}
          components={components}
          views={['month']}
          // A retirer si on veut avoir la vue agenda
          //"Vue agenda" peut poser problème en mobile
          // /!\ view = affiche le mois, la semaine ou le jour en défaut
          // /!\ views={['month]} render uniquement le mois
        />
      </Box>
    </div>
  );
};
