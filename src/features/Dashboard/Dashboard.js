import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useCreateCircleMutation } from '../Circle/CircleApi';
import SimpleBottomNavigation from './SimpleBottomNavigation';
import { useGetUserDashBoardQuery } from '../Dashboard/DashboardApi';
import ModaleCreateCircle from './ModaleCreateCircle';
import Card from './Card';
import DashbordLoader from './DashbordLoader';
import { useGetProfilUserQuery } from '../ProfilePage/ProfilApi';
import { useLocalstorageState } from 'rooks';
import { Link } from 'react-router-dom';

export const Dashboard = ({ setEnabled, setAppToken, setAppUserId }) => {
  const [token, setToken] = useLocalstorageState('token', 0);
  const [user_id, setUserId] = useLocalstorageState('user_id', 0);

  const {
    refetch,
    data: DashData,
    isLoading: dashboardIsLoading,
    isError: loginIsError,
  } = useGetUserDashBoardQuery({
    token,
    user_id,
  });
  // Detect if data are here, then modale launch
  useEffect(() => {
    setAppToken(token);
    setAppUserId(user_id);
  }, []);
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);

  const { data: userData } = useGetProfilUserQuery({ token, user_id });

  const [
    createCircle,
    {
      data: dataCreateCircle,
      isError: createCircleError,
      isSuccess: createCircleSuccess,
    },
  ] = useCreateCircleMutation();

  const toggleCreate = () => {
    setOpenCreate(!openCreate);
  };
  const toggleJoin = () => {
    setOpenJoin(!openJoin);
  };

  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    document.title = `Circle - Dashboard`;
  }, []);

  useEffect(() => {
    createCircleSuccess && setOpenSnack(true);
  }, [createCircleSuccess]);
  useEffect(() => {
    if (userData?.firstconnect === false) {
      DashData && setEnabled(true);
    }
  }, [DashData, userData]);
  if (dashboardIsLoading) {
    return <DashbordLoader />;
  } else {
    return (
      <>
        <Box
          component={'div'}
          className=' relative flex flex-col items-center p-5 h-screen custom-bk:pr-[10vh] pt-20 custom-bk:pt-40 overflow-hidden'
        >
          <Link to='/profil'>
            <img
              className='  absolute left-1/2 transform -translate-x-1/2 w-24 h-24 custom-bk:w-52 custom-bk:h-52 rounded-full z-50 object-cover top-5 custom-bk:top-14 custom-bk:left-1/4 cursor-pointer'
              src={userData?.img_url}
              alt='Avatar user'
            />
          </Link>
          <Box
            id='begin'
            className=' card__container bg-darkysubg mb-3 h-[90%] w-full rounded-lg custom-bk:ml-[15vh] p-5 custom-bk:p-10 shadow-2xl darkMode:shadow-none max-w-[2000px]'
          >
            <Typography
              className='text-xl custom-bk:text-3xl font-bold block w-full h-max mt-5 mb-8'
              component='h5'
            >
              Mes Cercles :
            </Typography>
            <Box className='flex flex-wrap gap-10 h-[85%] overflow-y-auto items-start justify-center'>
              {DashData?.map((card) => {
                return (
                  <Card
                    key={card.circle_id}
                    name={card.name}
                    desc={card.description}
                    circle_id={card.circle_id}
                    img_url={card.img_url}
                    nb_number={card.users_count}
                    nb_online={card.nb_online}
                    nb_events={card.futur_events}
                    admin_picture={card.admin[0].img_url}
                    admin_surname={card.admin[0].surname}
                    usersList={card.users}
                    eventsList={card.events}
                  />
                );
              })}
            </Box>
          </Box>
          <SimpleBottomNavigation
            handleClickOpenCreate={toggleCreate}
            handleClickOpenJoin={toggleJoin}
          />
        </Box>
        <ModaleCreateCircle
          refetch={refetch}
          createCircle={createCircle}
          createCircleSuccess={createCircleSuccess}
          open={openCreate}
          toggleCreate={toggleCreate}
          createCircleError={createCircleError}
        />
      </>
    );
  }
};
