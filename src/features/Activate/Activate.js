import { Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { setStorage } from '../../utils/helperLocalStorage';
import { useActivateEmailQuery } from '../auth/authApi';
import { handleToken } from '../auth/authSlice';
import DashbordLoader from '../Dashboard/DashbordLoader';
export const Activate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { code_activate } = useParams();
  const { data, isLoading, isSuccess, isError } = useActivateEmailQuery({
    code_activate,
  });

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        if (
          data?.token !== null &&
          data?.token !== undefined &&
          data?.user_id !== null &&
          data?.user_id !== undefined
        ) {
          dispatch(handleToken({ token: data?.token, user_id: data?.user_id }));
          setStorage('token', data?.token);
          setStorage('user_id', data?.user_id);
        }
        navigate('/dashboard', { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {isSuccess ? (
        <>
          <Typography
            variant={'h4'}
            sx={{ marginBottom: { xs: '8rem', lg: '5rem' } }}
          >
            Votre e-mail est bien validé, redirection ...
          </Typography>
          <DashbordLoader
            text={'Your account is activating, please wait...'}
            time={3}
          />
        </>
      ) : (
        ''
      )}
    </Container>
  );
};
