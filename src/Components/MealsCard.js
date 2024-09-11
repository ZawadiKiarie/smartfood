import * as React from 'react';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import MealCardContent from './MealCardContent';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import Box from '@mui/material/Box';
import Divider, { dividerClasses } from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IconButton, Typography } from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UploadDialog from './UploadDialog';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


function MealsCard(){
  const [expanded, setExpanded] = React.useState(null);
  const [mealImages, setMealImages] = React.useState({//holds the uploaded images
    Breakfast: null,
    Lunch: null,
    Dinner: null,
  })
  const [mealResults, setMealResults] = React.useState({
    Breakfast: [],
    Lunch: [],
    Dinner: []
  })
  const [mealTotal, setMealTotal] = React.useState({
    Breakfast: null,
    Lunch: null,
    Dinner: null,
  })
  const [currentMeal, setCurrentMeal] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [allMealsGL, setAllMealsGL] = React.useState(0);

  const handleExpand = (meal) => {
    if (mealImages[meal] === null){//if no image has been uploaded
      setCurrentMeal(meal);
      setDialogOpen(true);
    }else {//there is a meal
      setExpanded(expanded === meal ? null: meal);
    }
  }

  const handleDialogClose = (uploadedImage, results) => {
    console.log(results)
    if(uploadedImage && results && results.food_items) {
      setMealImages((prevImages) => ({
        ...prevImages,
        [currentMeal]: uploadedImage,
      }))
      setMealResults((prevResults) => ({
        ...prevResults,
        [currentMeal]: results.food_items,
      }));
      setMealTotal((prevImages) => ({
        ...prevImages,
        [currentMeal]: results.total_glycemic_load,
      }))
      setAllMealsGL((prevTotal) => (
        Math.round((prevTotal + results.total_glycemic_load) * 100) / 100
      ))
      setExpanded(currentMeal);
    }

    setDialogOpen(false);
  }

  const handleDeleteFood = (meal) => {
    setMealImages((prevImages) => ({
      ...prevImages,
      [meal]: null,
    }))
    setMealResults((prevResults) => ({
      ...prevResults,
      [meal]: [],
    }));
    setMealTotal((prevImages) => ({
      ...prevImages,
      [meal]: null,
    }))
    setAllMealsGL((prevTotal) => {
      const newTotal = prevTotal - mealTotal[meal]
      return Math.round(newTotal * 100) /100;
  })
    setExpanded(null);
  }


  return(
    <Box>
      <Box sx={{ mb: 4 }}>
        {['Breakfast', 'Lunch', 'Dinner'].map((meal, index) => (
          <React.Fragment key={meal}>
            <Accordion
              expanded={expanded === meal}
            >
              <AccordionSummary
                expandIcon={
                  <IconButton onClick={() =>    handleExpand(meal)}>
                  {expanded === meal ? <RemoveCircleOutlineOutlinedIcon /> : <AddCircleOutlineIcon />}
                  </IconButton>
              }
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemAvatar>
                    <Avatar>
                      {
                        meal === 'Breakfast' ? <BreakfastDiningIcon />:
                        meal === 'Lunch' ? <LunchDiningIcon /> :
                        <DinnerDiningIcon />
                        }
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={meal} />

                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <img 
                    src={mealImages[meal] ? URL.createObjectURL(mealImages[meal]): ''} 
                    alt={`${meal} Upload`} 
                    style={{ maxWidth: '100px'}} />
                  <Box>
                  {mealResults[meal].map((item) => (
                    <React.Fragment key={item.food_item}>
                      <Typography>{`${item.food_item}: ${item.glycemic_load}`}</Typography>
                    </React.Fragment>
                  ))}
                  <Typography>{`Total GL: ${mealTotal[meal]}`}</Typography>
                  </Box>
                </Box>
              </AccordionDetails>
              <AccordionActions>
                <Button
                  onClick={() => handleDeleteFood(meal)}
                 variant="contained" startIcon={<DeleteIcon />}>Delete Food</Button>
              </AccordionActions>
            </Accordion>

            {index < 2 && <Divider />}
          </React.Fragment>
        ))}

        <UploadDialog
          open={dialogOpen}
          onClose={(uploadedImage, results) => {
            handleDialogClose(uploadedImage, results)
          }}
        />
        
      </Box>
      <Typography component="h3" variant="h6">{`Total Glycemic Load: ${allMealsGL}`}</Typography>
    </Box>
    
  )
  
}

export default MealsCard;