import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function SwitchDL({ setTheme, theme }) {
  return (
    <Box
    className='p-0'
      sx={{
        position: 'fixed',
        right: '1rem',
        top: '1rem',
        padding: '0rem',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      <IconButton
        sx={{ ml: 1 }}
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        }}
        color='inherit'
      >
        {theme === 'dark' ? (
            <LightModeIcon />
        ) : (
            <DarkModeIcon />
        )}
      </IconButton>
    </Box>
  );
}
