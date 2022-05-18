import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Modal, styled, Typography } from '@mui/material';
import { handleChange } from './dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: '50%',
  bgcolor: 'var(--background)',
  color: 'var(--background)',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '20px',
  p: 4,
};

export default function ModaleCreateCircle({
  open,
  toggleCreate,
  createCircle,
  refetch,
  createCircleError,
  createCircleSuccess,
}) {
  const dispatch = useDispatch();
  const { name, description, color, img_url } = useSelector(
    (state) => state.dashboard
  );
  const { token, user_id } = useSelector((state) => state.auth);
  return (
    <div>
      <Modal open={open} onClose={toggleCreate}>
        <Box
          sx={style}
          component='form'
          autoComplete='off'
          onSubmit={async (event) => {
            event.preventDefault();
            await createCircle({
              token,
              user_id,
              name,
              description,
              color,
              img_url,
            });
            refetch();
            toggleCreate();
          }}
        >
          <Typography sx={{ fontSize: '2rem', fontWeight: '700' }}>
            Créer votre propre Cercle !
          </Typography>
          <TextField
            autoFocus
            required
            margin='dense'
            error={createCircleError}
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
            <Button onClick={toggleCreate}>Retour</Button>
            <Button type='submit'>Créer</Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}
