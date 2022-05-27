import { Input } from '../Common/Input/Input';
import { useEffect, useState } from 'react';
import './styles.scss';
import './../../styles/variables.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  useLoginUserMutation,
  useRegisterUserMutation,
  useResetPasswordMutation,
} from './authApi';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { clearList, handleChange } from './authSlice';
import { Loading } from '../Common/Loading/Loading';
import { Link } from '@mui/material';
import SnackBarAuth from './SnackBarAuth';
import moment from 'moment-timezone';
import { snackbarHandle } from '../Common/SnackbarGlobal/eventSlice';
import ModalResetPassword from './ModalResetPassword';
import fullLogo from '../../assets/images/fullLogoNight.svg';
import SwitchDL from './SwitchDL';

export const Login = ({ setTheme, theme }) => {
  const dispatch = useDispatch();
  // Get var from the slice state auth
  const {
    email,
    password,
    firstname,
    lastname,
    birthdate,
    surname,
    circleCode,
    userExist,
  } = useSelector((state) => state.auth);

  /**
   * All about SnackBar
   */
  const [openSnacke, setOpenSnacke] = useState(false);

  const toggleSnacke = () => {
    setOpenSnacke(!openSnacke);
  };
  useEffect(() => {
    if (circleCode && userExist === 'true') {
      dispatch(
        snackbarHandle({
          name: 'snackbarhandle',
          data: {
            open: true,
            success: true,
            message:
              "Veuillez vous connecter pour valider l'adhésion à ce cercle",
          },
        })
      );
    }
    if (circleCode && userExist === 'false') {
      console.log('ok 22');
      dispatch(
        snackbarHandle({
          name: 'snackbarhandle',
          data: {
            open: true,
            success: true,
            message:
              "Veuillez créer votre compte pour valider l'adhésion à ce cercle",
          },
        })
      );
    }
  }, [circleCode, userExist]);
  /**
   * Change the skip state, allow to fetch data from the server
   */
  const [date, setDate] = useState(Date);
  // First argument, the function we launch, second the result (destructuring here)
  const [
    loginUser,
    {
      error: errorLogin,
      isLoading: loginIsLoading,
      isError: loginIsError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const [registerUser] = useRegisterUserMutation();


  /**
   * Opening of modal for reset password
   */
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  const [resetPassword] = useResetPasswordMutation();

  /**
   * 
   */
  const handleSwitch = () => {
    const container = document.getElementById('container');
    container.classList.toggle('right-panel-active');
  };

  return (
    <div className='login-container'>
      <SwitchDL setTheme={setTheme} theme={theme} />
      <img src={fullLogo} alt='Logo Circles' className='login-logo' />
      {loginIsLoading && <Loading />}

      <div className='container' id='container'>
        <div className='form-container sign-up-container'>
          <h4 className='mobile-title mobile-title--signup'>S'enregistrer</h4>
          <form
            name='register-form'
            className='register-form flex flex-col '
            onSubmit={async (event) => {
              event.preventDefault();
              // Here we launch the RTK querie (mutation) with the arguments
              try {
                await registerUser({
                  firstname,
                  lastname,
                  email,
                  password,
                  birthdate,
                  surname,
                  circleCode,
                });
                dispatch(clearList());
                dispatch(
                  snackbarHandle({
                    name: 'snackbarhandle',
                    data: {
                      open: true,
                      success: true,
                      message: 'Veuillez confirmer votre e-mail !',
                    },
                  })
                );
              } catch (error) {
                dispatch(
                  snackbarHandle({
                    name: 'snackbarhandle',
                    data: {
                      open: true,
                      success: false,
                      message: 'Une erreur est survenue.',
                    },
                  })
                );
              }
            }}
          >
            <Input
              name='Prénom'
              input='firstname'
              required={true}
              value={firstname}
              type={'text'}
            />
            <Input name='Nom' input='lastname' value={lastname} type={'text'} />
            <Input
              name='Pseudo'
              input='surname'
              required={true}
              value={surname}
              type={'text'}
            />
            <Input
              name='E-mail'
              input='email'
              type='email'
              value={email}
              required={true}
              // error={loginIsError}
            />
            <Input
              name='Mot de passe'
              input='password'
              value={password}
              required={true}
              type={'password'}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Birth date'
                name='birthdate'
                value={birthdate}
                required={true}
                format='yyyy-mm-dd'
                inputFormat='dd/MM/yyyy'
                onChange={(event) => {
                  // Reformatage de la date pour l'envoie vers la BDD
                  const [date] = event.toISOString().split('T');
                  const formatDate = moment(date)
                    .tz('Europe/Paris')
                    .format('YYYY-MM-DD');
                  dispatch(
                    handleChange({
                      name: 'birthdate',
                      payload: formatDate,
                    })
                  );
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <button className='button' type={'submit'}>
              Créer votre compte
            </button>
            <button
              className='ghost button button--signin'
              id='signIn'
              variant='contained'
              onClick={handleSwitch}
              type='button'
            >
              Se connecter
            </button>
          </form>
        </div>
        <div className='form-container sign-in-container'>
          <h4 className='mobile-title mobile-title--login'>Se connecter</h4>
          <form
            name='login-form'
            className='login-form'
            onSubmit={async (event) => {
              event.preventDefault();
              // Here we launch the RTK querie (mutation) with the arguments
              await loginUser({
                email,
                password,
                circleCode,
              });
              dispatch(clearList());
            }}
          >
            <div className='input__container relative flex flex-col'>
              <Input
                className='input'
                color='primary'
                name='Adresse mail'
                required={true}
                value={email}
                input='email'
                type='email'
                error={loginIsError}
              />
              <Input
                className='input'
                name='Mot de passe'
                required={true}
                value={password}
                input='password'
                type='password'
                error={loginIsError}
              />

              {loginIsError ? (
                <p
                  style={{
                    color: 'red',
                    position: 'absolute',
                    bottom: '-30px',
                    whiteSpace: 'nowrap',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontWeight: '700',
                  }}
                >
                  {loginError.data === 'Password is incorrect'
                    ? 'Password incorect'
                    : 'Email does not exist'
                    ? "Le compte n'existe pas"
                    : loginError.data === 'Email does not exist'
                    ? 'E-mail ou mot de passe incorrect'
                    : loginError.data === 'Email not validated'
                    ? 'Votre e-mail doit être validé.'
                    : 'Une erreur est survenue'}
                </p>
              ) : (
                ''
              )}
            </div>

            <Link
              className='forgot_password'
              onClick={toggleModal}
              sx={{ cursor: 'pointer' }}
            >
              Mot de passe oublié?
            </Link>
            <button className='button' type={'submit'} variant='contained'>
              Se connecter
            </button>
            <button
              className='ghost button button--signup z-50'
              id='signUp'
              type='button'
              variant='contained'
              onClick={handleSwitch}
            >
              S'inscrire
            </button>
          </form>
        </div>
        <div className='middleLine'></div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1 className='texts'>De retour sur Circles?</h1>
              <p className='texts'>Cliquez ci-dessous pour vous connecter</p>
              <button
                className='ghost button z-50'
                id='signIn'
                type='button'
                variant='contained'
                onClick={handleSwitch}
              >
                Se connecter
              </button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1 className='texts'>Vous ne connaissez pas Circles?</h1>
              <p className='texts'>
                Cliquez ci-dessous pour vous inscrire et découvrir nos outils
              </p>
              <button
                className='ghost button'
                id='signUp'
                variant='contained'
                onClick={handleSwitch}
              >
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>
      <SnackBarAuth
        openSnacke={openSnacke}
        setOpenSnacke={setOpenSnacke}
        toggleSnacke={toggleSnacke}
      />
      <ModalResetPassword
        openModal={openModal}
        toggleModal={toggleModal}
        resetPassword={resetPassword}
      />
    </div>
  );
};
