import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  textAlign: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '20px',
  backgroundColor: 'var(--subbackground)',
  color: 'var(--backgroundbutton)',
  p: 4,
};

export default function ListOfUsers({ open, onClose, userList }) {
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '.5rem',
              textDecoration: 'underline',
            }}
          >
            Membres du cercle :
          </Typography>
          {userList?.map((user) => {
            return <Typography key={Date.now()}>{user.surname}</Typography>;
          })}
        </Box>
      </Modal>
    </div>
  );
}
