import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import { Box, Modal, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { handleChange } from './CircleSlice';
import { useGetUserDashBoardQuery } from '../Dashboard/DashboardApi';
import { useLocalstorageState } from 'rooks';
import { useNavigate } from 'react-router';
import { snackbarHandle } from '../Common/SnackbarGlobal/eventSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '800px',
  height: 'fit-content',
  backgroundColor: 'var(--subbackground)',
  color: 'var(--backgroundbutton)',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '20px',
  p: 4,
};

export default function ModaleModifyCircle({
  open,
  toggleModify,
  circleData,
  modifyCircle,
  refetch,
  modifyCircleError,
  modifyCircleSuccess,
  deleteCircle,
  circleRefetch,
  dataModifyCircle,
  inviteCircle,
  unique_code,
}) {
  console.log(unique_code);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalstorageState('token', 0);
  // eslint-disable-next-line no-unused-vars
  const [user_id, setUserId] = useLocalstorageState('user_id', 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { circle_id, name, description, color, img_url } = useSelector(
    (state) => state.circle
  );
  const { refetch: dashDataRefretch } = useGetUserDashBoardQuery({
    token,
    user_id,
  });
  return (
    <div>
      <Modal open={open} onClose={toggleModify}>
        <Box
          sx={style}
          component='form'
          autoComplete='off'
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await modifyCircle({
                circle_id,
                token,
                user_id,
                name,
                description,
                color,
                img_url,
              });
              dispatch(
                snackbarHandle({
                  name: 'snackbarhandle',
                  data: {
                    open: true,
                    success: true,
                    message: 'Votre cercle a bien été modifié.',
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
            circleRefetch();
            dashDataRefretch();
            toggleModify();
          }}
        >
          <Typography sx={{ fontSize: '2rem', fontWeight: '700' }}>
            Modifier
          </Typography>
          <TextField
            autoFocus
            required
            margin='dense'
            error={modifyCircleError}
            value={name}
            id='name'
            label='Nom du cercle'
            type='text'
            fullWidth
            variant='standard'
            sx={{ color: 'red' }}
            onChange={(event) => {
              dispatch(
                handleChange({
                  name: 'name',
                  payload: event.target.value,
                })
              );
            }}
          />
          <TextField
            margin='dense'
            required
            id='name'
            label='Description du cercle'
            type='text'
            value={description}
            fullWidth
            variant='standard'
            onChange={(event) => {
              dispatch(
                handleChange({
                  name: 'description',
                  payload: event.target.value,
                })
              );
            }}
          />
          <TextField
            required
            margin='dense'
            id='name'
            label='Couleur de votre cercle'
            type='color'
            value={color}
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
          <TextField
            required
            margin='dense'
            id='name'
            label='Image de votre cercle (url)'
            type='text'
            value={img_url}
            fullWidth
            variant='standard'
            onChange={(event) => {
              dispatch(
                handleChange({
                  name: 'img_url',
                  payload: event.target.value,
                })
              );
            }}
          />
          <DialogActions>
            <Button
              sx={{
                '&.MuiButton-root': {
                  backgroundColor: '#EE9F28',
                },
              }}
              type='submit'
            >
              Modifier
            </Button>
            <Button
              sx={{
                '&.MuiButton-root': {
                  backgroundColor: 'red',
                },
              }}
              onClick={async (event) => {
                event.preventDefault();
                try {
                  await deleteCircle({
                    circle_id,
                    token,
                    user_id,
                  });
                  dispatch(
                    snackbarHandle({
                      name: 'snackbarhandle',
                      data: {
                        open: true,
                        success: true,
                        message: 'Votre cercle a bien été supprimé ! ',
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
                dashDataRefretch();
                refetch();
                toggleModify();
                navigate('/dashboard');
              }}
            >
              Supprimer
            </Button>
          </DialogActions>

          {/* <Tooltip title='Code secret du cercle'>
            <IconButton
              sx={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigator.clipboard.writeText(dataModifyCircle?.unique_code);
                dispatch(
                  snackbarHandle({
                    name: 'snackbarhandle',
                    data: {
                      open: true,
                      success: true,
                      message: 'Code de cercle copié!',
                    },
                  })
                );
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip> */}
        </Box>
      </Modal>
    </div>
  );
}
