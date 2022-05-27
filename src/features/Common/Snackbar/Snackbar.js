import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useState } from 'react';
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function CustomizedSnackbars({
  openSnack,
  setOpenSnack,
  dataCreateCircle,
}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setOpenSnack(false);
    }

    setOpenSnack(false);
  };
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar onClose={handleClose} open={openSnack} autoHideDuration={6000}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {`Votre cercle "${dataCreateCircle?.name}" a bien été créé !`}
        </Alert>
      </Snackbar>
      {/* <Alert severity='error'>This is an error message!</Alert>
      <Alert severity='warning'>This is a warning message!</Alert>
      <Alert severity='info'>This is an information message!</Alert>
      <Alert severity='success'>This is a success message!</Alert> */}
    </Stack>
  );
}
