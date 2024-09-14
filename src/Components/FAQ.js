import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FAQ(){
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel: false);
  }

  return(
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 }
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' }
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1d-content'
            id="panel1d-header"
          >
            <Typography component="h3" variant="subtitle2">
              How does the app calculate the glycemic load of my meal?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Our app uses advanced food recognition technology to detect and segment food items in your meal. It then calculates the glycemic load based on the portion sizes and nutritional information of each food item.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2d-content'
            id="panel2d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Is the app suitable for people with diabetes?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant='body2'
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Absolutely! The app is especially made for people with diabetes by offering real-time insights into the glycemic load of their meals, helping them make more informed dietary choices.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel3d-content'
            id="panel3d-header"
          >
            <Typography component="h3" variant="subtitle2">
              How accurate are the glycemic load calculations?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant='body2'
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              The glycemic load results are based on the latest nutritional data, but they may vary depending on portion sizes and food preparation methods. The app is designed to provide a general estimate to help guide healthier choices.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel4d-content'
            id="panel4d-header"
          >
            <Typography component="h3" variant="subtitle2">
              How many meals can the app currently predict and calculate glycemic load for?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant='body2'
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Our model can predict and segment 9 common Kenyan foods: rice, beans, cabbage, chapati, ndengu, spinach, ugali, beef, and kales. We're continuously working to expand the food database, and more options will be available in the future.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  )
}

export default FAQ;