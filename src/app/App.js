import { Routes, Route, Navigate, useNavigate } from 'react-router';
import { Dashboard } from '../features/Dashboard/Dashboard';
import './App.scss';
import useLocalStorage from 'use-local-storage';
import { ThemeProvider } from '@emotion/react';
import 'intro.js/introjs.css';
import {
  MuiThemeLight,
  MuiThemeDark,
} from '../features/Common/MUITheme/muiTheme';
import { getStorage } from '../utils/helperLocalStorage';
import { PrivateRoute } from '../features/Common/PrivateRoute/PrivateRoute';
import { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleToken } from '../features/auth/authSlice';
import ProfilePage from '../features/ProfilePage/ProfilePage';
import FAQ from '../features/FAQ/Faq';
import ContactPage from '../features/ContactPage/ContactPage';
import MiniDrawer from '../features/Drawer/miniDrawer';
import { CssBaseline } from '@mui/material';
import Circle from '../features/Circle/Circle';
import { Activate } from '../features/Activate/Activate';
import { ErrorPage } from './../features/404/404';
import { SnackbarGlobal } from '../features/Common/SnackbarGlobal/SnackbarGlobal';
import ResetPassword from '../features/auth/ResetPassword';
import { Login } from '../features/auth/Login';
import { InviteDashboard } from '../features/InviteDashboardPage/InviteDashboardPage';
import { Steps } from 'intro.js-react';
import {
  useGetProfilUserQuery,
  useUpdateProfilUserMutation,
} from '../features/ProfilePage/ProfilApi';
import { useLocalstorageState } from 'rooks';
// Detect the prefer color scheme from the user, and add it automatically to the local storage.
const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputData = useSelector((state) => state.auth);
  const [skip, setSkip] = useState(true);
  /**
   * Use for open or close the left menu
   */
  const [open, setOpen] = useState(false);
  const handleToggleOpen = () => {
    setOpen(!open);
  };
  // Recuperation du state token(auth slice)
  const { token: tokenState } = useSelector((state) => state.auth);
  /**
   * Get the token from the local storage
   */
  const [token, setAppToken] = useState();
  const [user_id, setAppUserId] = useState();
  /**
   * Get the token, and add it to the store(if exist)
   */
  useEffect(() => {
    if (
      token !== null &&
      token !== undefined &&
      user_id !== null &&
      user_id !== undefined
    )
      dispatch(handleToken({ token, user_id }));
  }, []);
  const [
    updateProfilUser,
    { refetch: updateUserRefetch, isLoading: isLoadingUpdate, error },
  ] = useUpdateProfilUserMutation();
  // Get the theme based on the prefer color scheme of the user, and get it to the local storage
  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light'
  );
  /**
   * Allow to switch a theme
   */
  const { refetch: refetchProfilUser } = useGetProfilUserQuery(
    {
      token,
      user_id,
    },
    { skip: skip }
  );
  const muiTheme = theme === 'light' ? MuiThemeLight : MuiThemeDark;
  document.body.dataset.theme = theme;
  //! Introjs
  const [enabled, setEnabled] = useState(false);
  const [initialStep, setInitialStep] = useState(0);
  const onExit = () => {
    setEnabled(false);
  };

  const steps = [
    {
      element: '#begin',
      intro: 'Bienvenue dans votre dashboard ! Ici vous trouverez vos Cercles.',
      tooltipClass: 'customTooltip',
      // intro:
      //   'Bienvenue dans votre dashboard. Il fais vide ici, et si nous créions un Cercle?',
    },
    {
      element: '#circlecreate',
      intro: 'Vous pouvez créer un cercle ici.',
      tooltipClass: 'customTooltip',
    },
    {
      element: '#menu',
      intro:
        'Voici le menu, il vous permettra de mieux vous repérer et naviguer.',
      position: 'right',
      tooltipClass: 'customTooltip',
    },
    {
      element: '#menu_dashboard',
      intro: 'Ici vous retrouverez le boutton pour accéder au dashboard',
      position: 'right',
      tooltipClass: 'customTooltip',
    },
    {
      element: '#menu_circles',
      intro: 'Ici vous retrouverez tous vos cercles',
      position: 'right',
      tooltipClass: 'customTooltip',
    },
    {
      element: '#menu_faq',
      intro: 'La page FAQ, pour tout savoir sur notre app.',
      position: 'right',
      tooltipClass: 'customTooltip',
    },
    {
      element: '#menu_contact',
      intro: "La page pour nous contacter, c'est ici que ça se passe",
      position: 'right',
      tooltipClass: 'customTooltip',
    },
    {
      element: '#menu_profil',
      intro: 'Votre profil est disponible ici.',
      position: 'right',
      tooltipClass: 'customTooltip',
    },

    {
      element: '#menu_darkmode',
      intro: 'Le darkmode menu, selon vos préférences.',
      position: 'right',
      tooltipClass: 'customTooltip',
    },
    {
      element: '#menu_disconnect',
      intro: 'Le boutton de déconnection',
      position: 'right',
      tooltipClass: 'customTooltip',
    },
    {
      element: '#profil_infobulles',
      intro:
        'A vous de jouez ! Vous pouvez réactiver les infobulles dans la page profil.',
      position: 'left',
      tooltipClass: 'customTooltip',
    },
  ];
  useEffect(() => {
    if (skip === false) refetchProfilUser();
  }, [skip]);
  //! -----------------
  return (
    <div className='App relative'>
      <Steps
        enabled={enabled}
        steps={steps}
        initialStep={initialStep}
        onExit={onExit}
        onBeforeChange={(change) => {
          if (change === 2) {
            handleToggleOpen();
          }
          if (change === 5) {
            navigate('/faq');
          }
          if (change === 6) {
            navigate('/contact');
          }
          if (change === 7) {
            navigate('/profil');
          }

          if (change === 8) {
            navigate('/dashboard');
          }
        }}
        onChange={async (change) => {
          if (change === steps.length - 1) {
            handleToggleOpen();
            await updateProfilUser({
              token,
              user_id,
              firstconnect: true,
              birthdate: '',
            });
            setSkip(false);
          }
        }}
        exitOnEsc
        options={{
          doneLabel: "Let's go!",
        }}
      />

      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {tokenState && (
          <MiniDrawer
            handleToggleOpen={handleToggleOpen}
            setTheme={setTheme}
            theme={theme}
            setOpen={setOpen}
            open={open}
          />
        )}
        <Routes>
          <Route
            path='/'
            element={
              tokenState ? (
                <Navigate to='/dashboard' replace />
              ) : (
                <Login setTheme={setTheme} theme={theme} />
              )
            }
          />
          <Route
            path='/reset-password/:reset_code'
            element={
              tokenState ? (
                <Navigate to='/dashboard' replace />
              ) : (
                <ResetPassword />
              )
            }
          />
          <Route path='/activate/:code_activate' element={<Activate />} />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute token={tokenState}>
                <Dashboard
                  setEnabled={setEnabled}
                  setAppToken={setAppToken}
                  setAppUserId={setAppUserId}
                />
              </PrivateRoute>
            }
          />
          <Route
            path='/profil'
            element={
              <PrivateRoute token={tokenState}>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path='/circle/:circle_id'
            element={
              <PrivateRoute token={tokenState}>
                <Circle />
              </PrivateRoute>
            }
          />
          <Route path='/faq' theme={muiTheme} element={<FAQ />} />
          <Route path='/contact' theme={muiTheme} element={<ContactPage />} />
          <Route
            path='/invite/:circleInfo'
            theme={muiTheme}
            element={<InviteDashboard />}
          />
          <Route path='*' theme={muiTheme} element={<ErrorPage />} />
        </Routes>
        <SnackbarGlobal />
      </ThemeProvider>
    </div>
  );
};
export default App;
