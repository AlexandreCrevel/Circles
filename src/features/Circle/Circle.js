import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router';
import {
  useDeleteCircleMutation,
  useGetCircleQuery,
  useInviteCircleMutation,
  useModifyCircleMutation,
} from './CircleApi';
import CircleBottomNavigation from './CircleBottomNavigation';
import CircleChat from './Chat/CircleChat';
import CircleHeader from './CircleHeader';
import {
  useGetProfilUserQuery,
  useUpdateProfilUserMutation,
} from '../ProfilePage/ProfilApi';
import { useEffect, useState } from 'react';
import ModalModifyCircle from './ModalModifyCircle';
import { changeCircle, handleChange } from './CircleSlice';
import { useGetUserDashBoardQuery } from '../Dashboard/DashboardApi';
import ModaleJoinCircle from '../Dashboard/ModaleJoinCircle';
import { CircleCalendar } from './Calendar/CircleCalendar';
import { Steps } from 'intro.js-react';
export default function Circle() {
  // Get id of the route
  //! Introjs
  const [enabled, setEnabled] = useState(false);
  const [initialStep, setInitialStep] = useState(0);
  const onExit = () => {
    setEnabled(false);
  };

  const steps = [
    {
      // element: '#begin_circle',
      intro: 'Bienvenue sur votre Cercle ! Voyons cela ensemble.',
      tooltipClass: 'customTooltip',
    },
    {
      element: '#begin_circle',
      intro: 'Voici le nom de votre cercle, vous pouvez le modifier ici.',
      tooltipClass: 'customTooltip',
    },
    {
      element: '#invite_circle',
      intro: 'Vous pouvez inviter ici un nouveau membre.',
      tooltipClass: 'customTooltip',
    },
    {
      element: '#calendar_circle',
      intro:
        'Voici le calendrier,ici vous pourrez ajouter des évènements personnalisés',
      tooltipClass: 'customTooltip',
    },
    {
      element: '#circle_chat_button',
      intro: 'Ici vous pouvez passer de calendrier à chat.',
      tooltipClass: 'customTooltip',
    },
    {
      element: '#chat',
      intro: 'Et pour finir, voici le chat de votre Cercle.',
      tooltipClass: 'customTooltip',
    },
  ];
  //! -----------------
  const dispatch = useDispatch();
  const { circle_id } = useParams();
  // Get the token and user_id from the state auth
  const { user_id, token } = useSelector((state) => state.auth);
  const [dataCircle, setDataCircle] = useState();
  // Get the menu from the state circle
  const { menu, name, description, img_url } = useSelector(
    (state) => state.circle
  );
  const [skip, setSkip] = useState(true);

  const [openInvite, setOpenInvite] = useState(false);
  const toggleInvite = () => {
    setOpenInvite(!openInvite);
  };
  const [
    updateProfilUser,
    { refetch: updateUserRefetch, isLoading: isLoadingUpdate, error },
  ] = useUpdateProfilUserMutation();
  useEffect(() => {
    if (token !== null && user_id !== null) {
      setSkip(false);
    }
  }, [token]);

  /**
   * Make the query when we are into the circle
   */
  const {
    refetch: circleRefetch,
    data: circleData,
    isSuccess: CircleIsSuccess,
    isLoading: circleIsLoading,
  } = useGetCircleQuery(
    {
      token,
      circle_id,
    },
    {
      skip: skip,
    }
  );
  const {
    refetch,
    data: DashData,
    isLoading: dashboardIsLoading,
    isError: loginIsError,
  } = useGetUserDashBoardQuery({
    token,
    user_id,
  });
  /**
   * Modal to modify circle
   */
  const [openModify, setOpenModify] = useState(false);
  const toggleModify = () => {
    setOpenModify(!openModify);
  };
  const [
    modifyCircle,
    {
      data: dataModifyCircle,
      isError: modifyCircleError,
      isSuccess: modifyCircleSuccess,
    },
  ] = useModifyCircleMutation();
  const [inviteCircle, { isSuccess: inviteCircleSuccess }] =
    useInviteCircleMutation();
  const [
    deleteCircle,
    {
      data: dataDeleteCircle,
      isError: deleteCircleError,
      isSuccess: deleteCircleSuccess,
      isLoading,
    },
  ] = useDeleteCircleMutation();

  /**
   * Make the query for get the profil user information
   */
  const { data: profilData, refetch: refetchProfil } = useGetProfilUserQuery({
    token,
    user_id,
  });
  //* Socket part
  /**
   * On détecte et relance le socket join une fois que le circle success a bien été fais.
   */

  //* ------------

  /**
   * Change the name of page with Circle's title
   */
  useEffect(() => {
    if (circleData?.name) document.title = `Circle - ${circleData?.name}`;
    dispatch(changeCircle({ circle_id, name, desc: description, img_url }));
  }, [CircleIsSuccess]);

  useEffect(() => {
    if (profilData?.firstcircle === false) {
      circleData && setEnabled(true);
    }
  }, [profilData, circleData]);
  return (
    // <Box className=' relative flex flex-col items-center p-5 h-screen custom-bk:pr-[10vh] pt-20 custom-bk:pt-40 overflow-hidden'>
    <Box className=' relative flex flex-col items-center pt-5 pl-0 custom-bk:pl-20 h-screen custom-bk:pr-[5vh] overflow-hidden'>
      <Steps
        enabled={enabled}
        steps={steps}
        initialStep={initialStep}
        onExit={onExit}
        onBeforeChange={(change) => {
          if (change === 5) {
            dispatch(handleChange({ name: 'menu', payload: 'chat' }));
          }
        }}
        onChange={async (change) => {
          if (change === steps.length - 1) {
            console.log('coucou ok');
            await updateProfilUser({
              token,
              user_id,
              firstcircle: true,
              birthdate: '',
              // firstconnect: profilData?.firstconnect,
            });
            refetchProfil();
          }
        }}
        exitOnEsc
        options={{
          doneLabel: "Let's go!",
        }}
      />
      <CircleHeader
        circleData={circleData}
        toggleModify={toggleModify}
        toggleInvite={toggleInvite}
      />
      {/* <Button onClick={toggleModify}>TestUpdate</Button> */}

      <ModalModifyCircle
        unique_code={circleData?.unique_code}
        inviteCircle={inviteCircle}
        refetch={circleRefetch}
        dataModifyCircle={circleData}
        modifyCircle={modifyCircle}
        modifyCircleSuccess={modifyCircleSuccess}
        open={openModify}
        toggleModify={toggleModify}
        modifyCircleError={modifyCircleError}
        deleteCircle={deleteCircle}
        circleRefetch={circleRefetch}
      />
      <ModaleJoinCircle
        openInvite={openInvite}
        toggleInvite={toggleInvite}
        inviteCircle={inviteCircle}
        unique_code={circleData?.unique_code}
      />
      {menu === 'calendar' ? (
        <CircleCalendar
          circleRefetch={circleRefetch}
          circleData={circleData}
          profilData={profilData}
          CircleIsSuccess={CircleIsSuccess}
          user_id={user_id}
          circle_id={circle_id}
          circleIsLoading={circleIsLoading}
        />
      ) : (
        <CircleChat
          circleData={circleData}
          profilData={profilData}
          CircleIsSuccess={CircleIsSuccess}
          user_id={user_id}
          circle_id={circle_id}
          circleIsLoading={circleIsLoading}
          circleRefetch={circleRefetch}
        />
      )}
      <CircleBottomNavigation />
    </Box>
  );
}
