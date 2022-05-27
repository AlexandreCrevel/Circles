import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import io from 'socket.io-client';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/system';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useEffect, useRef, useState } from 'react';
import UserAnswer from './UserAnswer';
import OtherAnswer from './OtherAnswer';
import BotMessage from './BotMessage';
import './style.scss';
import moment from 'moment';
const Chat = ({
  CircleIsSuccess,
  circleIsLoading,
  circleData,
  profilData,
  user_id,
  circle_id,
  circleRefetch,
}) => {
  const client = useRef();
  const chat = useRef();
  const [allowMessage, setAllowMessage] = useState(false);
  const [ioData, setIoData] = useState('');
  // Champ contrôlé pour récupérer les messages
  const [messagesWrite, setMessagesWrite] = useState('');
  // Les messages sur lesquels on map, on alloue les donnée des messages en premier state
  const [messageToMap, setMessageToMap] = useState(circleData?.messages);
  console.log(`🚀 ~ messageToMap`, messageToMap);

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      client.current.emit('chatMessage', messagesWrite);
      setMessagesWrite('');
    }
  };

  // Get messages from de BDD
  useEffect(() => {
    if (circleData && !allowMessage) {
      const messages = circleData?.messages || '';

      const arrayToSort = [...messages];

      const messageFinal = arrayToSort.sort((a, b) =>
        moment(a.time, 'YYYY-MM-DD HH:mm:ss').diff(
          moment(b.time, 'YYYY-MM-DD HH:mm:ss')
        )
      );

      setMessageToMap(messageFinal);
      setAllowMessage(true);
    }
  }, [circle_id, circleData]);
  /**
   * Use for join the socket.io room + get all messages dynamically
   */
  useEffect(() => {
    if (circleData && allowMessage) {
      const socket = io.connect('https://cercles.herokuapp.com');
      socket.emit('joinRoom', {
        surname: profilData?.surname,
        user_id,
        room: circleData?.unique_code,
      });
      socket.on('message', (data) => {
        setIoData(data);
      });
      client.current = socket;
      setAllowMessage(false);
    }
  }, [circle_id, circleData, allowMessage]);

  useEffect(() => {
    // if (messageToMap) {
    // if (messageToMap) {
    //   setMessageToMap([...messageToMap, ioData]);
    // } else {
    //   setMessageToMap([ioData && ioData]);
    // }
    if (ioData && ioData !== '') {
      console.log(`🚀 ~ ioData`, ioData);
      messageToMap
        ? setMessageToMap([...messageToMap, ioData])
        : setMessageToMap([ioData && ioData]);
      setIoData('');
    }
    // chat.current.scroll(0, chat.current.getBoundingClientRect().height);
    // chat.current.scrollIntoView({ behavior: 'smooth' });
    // } else {
    // setMessageToMap([ioData && ioData]);
    // }
  }, [ioData]);

  useEffect(() => {
    chat.current.scrollIntoView();
  }, [messageToMap]);
  return (
    <Box
      className='mb-3 w-[95vw] custom-bk:w-full rounded-lg p-5 custom-bk:p-10 flex column shadow-2xl darkMode:shadow-none max-w-[2000px] '
      sx={{
        height: { xs: '65vh', md: '75vh', lg: '66vh' },
      }}
    >
      <Grid container className='w-full flex row'>
        <Grid
          item
          xs={0}
          sm={3}
          md={2}
          className='border-r w-full flex column hidden small:block'
        >
          <List>
            <ListItem button key='RemySharp'>
              <ListItemIcon>
                <Avatar
                  alt='Remy Sharp'
                  src='https://material-ui.com/static/images/avatar/1.jpg'
                />
              </ListItemIcon>
              <ListItemText primary='Remy Sharp'>Remy Sharp</ListItemText>
              {/* <ListItemText secondary='online' align='right'></ListItemText> */}
            </ListItem>
            <ListItem button key='Alice'>
              <ListItemIcon>
                <Avatar
                  alt='Alice'
                  src='https://material-ui.com/static/images/avatar/3.jpg'
                />
              </ListItemIcon>
              <ListItemText primary='Alice'>Alice</ListItemText>
            </ListItem>
            <ListItem button key='CindyBaker'>
              <ListItemIcon>
                <Avatar
                  alt='Cindy Baker'
                  src='https://material-ui.com/static/images/avatar/2.jpg'
                />
              </ListItemIcon>
              <ListItemText primary='Cindy Baker'>Cindy Baker</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          md={10}
          className='w-full relative right-0 h-[100%] '
        >
          <List
            className='overflow-scroll '
            sx={{
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              height: { xs: '85%', lg: '90%' },
            }}
          >
            {/* Demander a Mathieu de mettre l'user_id pour filtrer les messages
             reçus et envoyés + l'img url + si le bot, on reçois une réponse du bot (id unique pour le bot? )  */}

            {messageToMap?.map((message, i) => {
              // Si on envoie
              if (circleIsLoading) {
                return [1, 2, 3, 4, 5, 6].map((number) => (
                  <Stack
                    spacing={1}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginLeft: '1rem',
                    }}
                  >
                    <Skeleton
                      variant='circular'
                      width={40}
                      height={40}
                      sx={{ alignSelf: 'flex-start' }}
                    />
                    <Skeleton
                      variant='text'
                      width={150}
                      sx={{
                        marginLeft: '1rem',
                      }}
                    />
                    <Skeleton
                      variant='circular'
                      width={40}
                      height={40}
                      sx={{ alignSelf: 'flex-end' }}
                    />
                    <Skeleton
                      variant='text'
                      width={150}
                      sx={{ alignSelf: 'flex-end', marginLeft: '1rem' }}
                    />
                  </Stack>
                ));
              } else if (message.surname === profilData.surname) {
                {
                  /* Si c'est nous */
                  return (
                    <UserAnswer
                      key={message + i}
                      surname={message.surname}
                      time={message.time}
                      text={message.text}
                      img_url={profilData.img_url}
                    />
                  );
                }
              } else if (message.user_id === 'Jarvis') {
                {
                  /* Pour le bot */
                  return (
                    <Box
                      sx={{
                        width: '100%',
                        // backgroundColor: '#4A4D51',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 1rem 1rem 1rem',
                        borderRadius: '5px',
                      }}
                    >
                      <BotMessage key={message + i} text={message.img_url} />
                    </Box>
                  );
                }
              } else {
                {
                  /*  Si autre personne */
                  return (
                    <OtherAnswer
                      key={message + i + 'bot'}
                      surname={message.surname}
                      time={message.time}
                      text={message.text}
                      img_url={message.img_url}
                    />
                  );
                }
              }
            })}
            <div ref={chat}></div>
          </List>
          <Divider />
          <Grid container className='absolute w-full bottom-0'>
            <Grid item xs={11}>
              <TextField
                color='primary'
                className='ml-4 '
                label='Message...'
                fullWidth
                maxRows={2}
                size='small'
                value={messagesWrite}
                onChange={(event) => {
                  // Champ contrôlé
                  setMessagesWrite(event.target.value);
                }}
                onKeyPress={(e) => {
                  if (
                    e.key === 'Enter' &&
                    messagesWrite.length > 0 &&
                    messagesWrite
                  ) {
                    client.current.emit('chatMessage', messagesWrite);
                    setMessagesWrite('');
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        type='submit'
                        aria-label='search'
                        onClick={() => {
                          client.current.emit('chatMessage', messagesWrite);
                          setMessagesWrite('');
                          // circleRefetch();
                        }}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
