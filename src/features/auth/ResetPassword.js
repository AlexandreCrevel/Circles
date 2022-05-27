import { Box, Button, Input } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import fullLogo from '../../assets/images/fullLogoNight.svg';
import { useChangePasswordMutation } from './authApi';

export default function ResetPassword() {
    const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [changePassword] = useChangePasswordMutation();
  const {reset_code} = useParams();

  return (
    <div className='login-container'>
      <img src={fullLogo} alt='Logo Circles' className='login-logo' />
      <Box
      component='form'
        className='flex column'
        name='reset-password-form'
        onSubmit={async (event) => {
            console.log("test")
          event.preventDefault();
          await changePassword({newPassword, reset_code});
          navigate('/');
          // Here we launch the RTK querie (mutation) with the arguments
        }}
      >
        <Input
          name='Mot de passe'
          input='password'
          value={newPassword}
          required={true}
          type={'password'}
          onChange={(event) => {
              setNewPassword(event.target.value)
            }}
        />
        <Button className='button' type='submit'>
          Valider
        </Button>
      </Box>
    </div>
  );
}
