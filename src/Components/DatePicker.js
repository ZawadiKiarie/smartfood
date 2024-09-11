import * as React from 'react';
import Typography from '@mui/material/Typography';

function DatePicker(){
  const today = new Date()
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(today);
  return (
    <Typography variant="body1" component="h2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>{formattedDate}</Typography>
  )
}

export default DatePicker;