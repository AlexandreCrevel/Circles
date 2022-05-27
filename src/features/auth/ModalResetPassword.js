import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import { Box } from '@mui/system';
import { Modal, Typography } from '@mui/material';
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
  width: '350px',
  maxWidth: '800px',
};

export default function ModalResetPassword({
  openModal,
  toggleModal,
  resetPassword,
}) {
  const [email, setEmail] = useState('');

  return (
    <div>
      <Modal open={openModal} onClose={toggleModal}>
        <Box
          sx={style}
          component='form'
          onSubmit={(event) => {
            event.preventDefault();
            resetPassword({ email });
            toggleModal();
            setEmail('');
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
            Mot de passe oublié ?
          </Typography>
          <Typography
            variant='h4'
            sx={{
              fontSize: '1rem',
              marginBottom: '.8rem',
            }}
          >
            Entrez l'adresse mail associée à votre compte :
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            id='email'
            label='Votre adresse mail'
            type='text'
            fullWidth
            variant='standard'
            value={email}
            InputLabelProps={{ style: { color: 'var(--maincolor-reverse)' } }}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <DialogActions>
            <Button type='submit'>Continuer</Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}
