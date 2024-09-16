import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MealsCard from './MealsCard';
import Copyright from './Copyright';
import { useUser } from '../context/UserContext';

function MainGrid(){
  const { user } = useUser();
  const firstName = user.name.split(' ')[0];

  const now = new Date();
  const hour = now.getHours();

  const [greeting, setGreeting] = React.useState('');

  React.useEffect(() => {
    const handleGreeting = () => {
      if(hour < 12){
        setGreeting('Good Morning');
      }else if (hour < 17){
        setGreeting('Good Afternoon');
      }else {
        setGreeting('Good Evening');
      }
    }

    handleGreeting();
  }, [hour])
  

  return(
    <Box
      sx={{
        width: '100%',
        maxWidth: { sm: '100%', md: '1700px' }
      }}
    >
      <Typography component="h2" variant="h4" sx={{ mb: 2 }}>{greeting}, {firstName}</Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>Track your meals, Today</Typography>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>Meals</Typography>
      <MealsCard />
      <Copyright sx={{ mt: 6 }} />
    </Box>
  )
}

export default MainGrid;