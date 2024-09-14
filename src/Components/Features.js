import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import MuiChip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';

const items = [
  {
    icon: <SpeedRoundedIcon />,
    title: 'Instant Glycemic Load Feedback',
    description:
      'Upload a photo of your meal and receive instant glycemic load information for each food item.',
    image: 'url("/assets/dashboard.png")'
  },
  {
    icon: <HistoryRoundedIcon />,
    title: 'Meal History Tracking',
    description:
      'Keep track of your meals with a detailed log of previously uploaded images and their glycemic load data.',
    image: 'url("/assets/dashboard5.png")'
  },
  {
    icon: <InsightsRoundedIcon />,
    title: 'Personalized Mutritional Insights',
    description:
      'Get tailored insights based on your dietary patterns.',
    image: 'url("/assets/dashboard.jpg")'
  }
]

const Chip = styled(MuiChip)(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        background:
          'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
        color: 'hsl(0, 0%, 100%)',
        borderColor: theme.palette.primary.light,
        '& .MuiChip-label': {
          color: 'hsl(0, 0%, 100%)',
        },
        ...theme.applyStyles('dark', {
          borderColor: theme.palette.primary.dark,
        }),
      },
    },
  ],
}));

function MobileLayout({ selectedItemIndex, handleItemClick, selectedFeature }) {
  if(!items[selectedItemIndex]){
    return null;
  }

  return(
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflow: 'auto'
        }}
      >
        {items.map(({ title }, index) => (
          <Chip
            size="medium"
            key={index}
            label={title}
            onClick={() => handleItemClick(index)}
            selected={selectedItemIndex === index}
           />
        ))}
      </Box>
      <Card variant='outlined'>
        <Box
          sx={{
            m: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={items[selectedItemIndex].image.replace('url("', '').replace('")', '')}
            alt={items[selectedItemIndex].title}
            sx={(theme) => ({
              width: '100%', // Adjust to fit your layout
              height: 'auto', // Maintain aspect ratio
              maxWidth: 420, // Limit maximum width of image
              borderRadius: '8px', // Border radius for rounded corners
              boxShadow: theme.shadows[3], // Subtle box shadow
              border: `1px solid ${theme.palette.divider}` // Border matching theme
            })}
          />
        </Box>
        <Box sx={{ mt: 5, px: 2, pb: 2 }}>
          <Typography
            gutterBottom
            sx={{ color: 'text.primary', fontWeight: 'medium' }}
          >
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  )
}

MobileLayout.propTypes = {
  handleItemClick: PropTypes.func.isRequired,
  selectedFeature: PropTypes.shape({
    description: PropTypes.string.isRequired,
    icon: PropTypes.element,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  selectedItemIndex: PropTypes.number.isRequired,
}

export { MobileLayout };

function Features(){
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  }

  const selectedFeature = items[selectedItemIndex];

  return(
    <Container
      id="features"
      sx={{ py: { xs: 8, sm: 8 } }}
    >
      <Box
        sx={{
          width: { sm: '100%',  md: '60%' },
          mb: 4
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Features
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse'},
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex'},
              flexDirection: 'column',
              gap: 2,
              height: '100%'
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 2,
                    height: '100%',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor: 'action.selected',
                  }
                ]}
              >
                <Box
                  sx={[
                    {
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                      gap: 1,
                      textAlign: 'left',
                      textTransform: 'none',
                      color: 'text.secondary'
                    },
                    selectedItemIndex === index && {
                      color: 'text.primary'
                    }
                  ]}
                >
                  {icon}
                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
           />
        </div>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            width: { xs: '100%', md: '70%' },
            height: 'var(--items-image-height)'
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                m: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src={items[selectedItemIndex].image.replace('url("', '').replace('")', '')}
                alt={items[selectedItemIndex].title}
                sx={(theme) => ({
                  width: '100%', // Adjust to fit your layout
                  height: 'auto', // Maintain aspect ratio
                  maxWidth: 420, // Limit maximum width of image
                  borderRadius: '8px', // Border radius for rounded corners
                  boxShadow: theme.shadows[3], // Subtle box shadow
                  border: `1px solid ${theme.palette.divider}` // Border matching theme
                })}
              />
            </Box>      
          </Card>
        </Box>
      </Box>
    </Container>
  )
}

export default Features;