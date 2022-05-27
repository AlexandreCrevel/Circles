import { ListItemText } from '@mui/material';

export default function BotMessage({ text, time }) {
  return (
    <div className=''>
      <ListItemText primary={text} sx={{color: 'var(--maincolor)'}}></ListItemText>
    </div>
  );
}
