import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function SnackBarAuth({
  openSnacke,
  setOpenSnacke,
  toggleSnacke,
}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnacke(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openSnacke} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={toggleSnacke} severity='success' sx={{ width: '100%' }}>
          Votre compte a bien été créé, veuillez valider votre e-mail.
        </Alert>
      </Snackbar>
      {/* <Alert severity='error'>This is an error message!</Alert>
      <Alert severity='warning'>This is a warning message!</Alert>
      <Alert severity='info'>This is an information message!</Alert>
      <Alert severity='success'>This is a success message!</Alert> */}
    </Stack>
  );
}
