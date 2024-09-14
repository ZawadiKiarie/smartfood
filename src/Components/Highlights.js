import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';
import TrackChangesRoundedIcon from '@mui/icons-material/TrackChangesRounded';
import CameraRoundedIcon from '@mui/icons-material/CameraRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';

const items = [
  {
    icon: <SpeedRoundedIcon />,
    title: 'Instant Glycemic Load Caluclation',
    description:
      'Get real-time glycemic load feedback for each food item with just one photo, empowering healthier choices.',
  },
  {
    icon: <InsightsRoundedIcon />,
    title: 'Comprehensive Meal Insights',
    description:
      'Track your dietary patterns with detailed analysis of each meal, ensuring you stay informed about your nutrition.',
  },
  {
    icon: <TouchAppRoundedIcon />,
    title: 'User-Friendly Interface',
    description:
      'Navigate effortlessly through a sleek and intuitive design, making nutrition tracking a seamless experience.',
  },
  {
    icon: <TrackChangesRoundedIcon />,
    title: 'Personalized Nutrition Goals',
    description:
      'Tailor your dietary journey with customized insights and recommendations based on your unique needs and health goals.',
  },
  {
    icon: <CameraRoundedIcon />,
    title: 'Innovative Food Recognition Technology',
    description:
      'Leverage cutting-edge image-assisted technology to identify food items with precision and accuracy.',
  },
  {
    icon: <StorageRoundedIcon />,
    title: 'Reliable Data Storage',
    description:
      'Keep your meal history secure and accessible, with reliable data storage for ongoing tracking and insights.',
  },
];

function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        backgroundColor: 'grey.900',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' }
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom>Highlights</Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Discover the standout features of our app: instant glycemic load analysis, personalized meal insights, an intuitive interface, and cutting-edge food recognition. Experience innovation and reliability in every detail.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(220, 25%, 25%, 0.3)',
                  backgroundColor: 'grey.800',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>{item.description}</Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Highlights;