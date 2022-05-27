import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { handleChange } from '../auth/authSlice';
import { useSearchParams } from 'react-router-dom';
import { useLocalstorageState } from 'rooks';
import { useJoinCircleMutation } from '../Circle/CircleApi';
import { snackbarHandle } from '../Common/SnackbarGlobal/eventSlice';
export const InviteDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    joinCircle,
    {
      data: dataJoinCircle,
      isError: joinCircleError,
      isSuccess: joinCircleSuccess,
      error: joinError,
    },
  ] = useJoinCircleMutation();
  // const {circlecode} = useParams();
  const { circleInfo } = useParams();
  const [searchParams] = useSearchParams();
  const userExist = searchParams.get('user-exist');
  const [token, setToken] = useLocalstorageState('token', 0);
  const [user_id, setUser_id] = useLocalstorageState('user_id', 0);
  useEffect(() => {
    if (token && circleInfo && user_id && circleInfo !== undefined) {
      console.log(`üöÄ ~ circleInfo`, circleInfo);
      joinCircle({
        token,
        user_id,
        unique_code: circleInfo,
      })
        .then(() => {
          console.log('jointerror', joinError);
          dispatch(
            snackbarHandle({
              name: 'snackbarhandle',
              data: {
                open: true,
                success: true,
                message: 'Vous avez rejoins votre nouveau Cercle !',
              },
            })
          );
          navigate('/dashboard', { replace: 'true' });
        })
        .catch((error) => {
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
          navigate('/dashboard', { replace: 'true' });
        });
    }
    if (!token) {
      dispatch(
        handleChange({
          name: 'circleCode',
          payload: circleInfo,
        })
      );
      dispatch(
        handleChange({
          name: 'userExist',
          payload: userExist,
        })
      );
      navigate('/', { replace: 'true' });
    }
  }, [circleInfo]);
};
