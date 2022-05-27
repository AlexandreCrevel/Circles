import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { handleChange } from './dashboardSlice';
import { Modal, Typography } from '@mui/material';
import { snackbarHandle } from '../Common/SnackbarGlobal/eventSlice';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '30%',
  bgcolor: 'var(--background)',
  color: 'var(--backgroundbutton)',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '20px',
  p: 4,
  width: '90vw',
  maxWidth: '800px',
};

export default function ModaleJoinCircle({
  openInvite,
  toggleInvite,
  inviteCircle,
  unique_code,
}) {
  const dispatch = useDispatch();
  const { token, user_id } = useSelector((state) => state.auth);
  const { circle_code } = useSelector((state) => state.dashboard);
  const [emailInvite, setEmailInvite] = useState('');
  return (
    <div>
      <Modal open={openInvite} onClose={toggleInvite}>
        <Box
          sx={style}
          component='form'
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await inviteCircle({
                email: emailInvite,
                token,
                unique_code,
              });
              dispatch(
                snackbarHandle({
                  name: 'snackbarhandle',
                  data: {
                    open: true,
                    success: true,
                    message: "L'e-mail d'invitation a bien été envoyé.",
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
            toggleInvite();
          }}
        >
          <Typography
            variant='h3'
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '.8rem',
              textDecoration: 'underline',
            }}
          >
            E-mail de la personne à inviter :
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            id='circle_code'
            label='Code du cercle'
            type='text'
            fullWidth
            variant='standard'
            InputLabelProps={{ style: { color: 'var(--maincolor-reverse)' } }}
            onChange={(e) => setEmailInvite(e.target.value)}
          />
          <DialogActions>
            <Button onClick={toggleInvite}>Annuler</Button>
            <Button type='submit'>Inviter</Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}
