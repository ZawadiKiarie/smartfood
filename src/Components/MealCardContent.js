import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UploadDialog from './UploadDialog';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function MealCardContent({ mealOption, mealIcon }){
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  return(
    <React.Fragment>
      <Demo>
        <List>
          <ListItemButton>
            <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="add" onClick={handleClickOpen}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                }
              >
                  <ListItemAvatar>
                    <Avatar>
                      {mealIcon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={mealOption}
                  />
              </ListItem>
          </ListItemButton>
        </List>
      </Demo>
      
      <UploadDialog
        open={open}
        onClose={handleClose}
       />
    </React.Fragment>
    
  )
}

export default MealCardContent;