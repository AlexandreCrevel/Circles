import { forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { snackBarClose } from './eventSlice';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export function SnackbarGlobal() {
  const dispatch = useDispatch();
  const { open, message, success } = useSelector((state) => state.event);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(
      snackBarClose({
        name: 'snackclose',
        open: false,
      })
    );
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      {/* <Alert severity={severity}>This is an error message!</Alert> */}
      {/* <Alert severity='warning'>This is a warning message!</Alert>
      <Alert severity='info'>This is an information message!</Alert> */}
      {/* <Alert severity='success'>This is a success message!</Alert> */}
    </Stack>
  );
}
