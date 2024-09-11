import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';

const mainListItems = [
  {text: 'Home', icon: <HomeRoundedIcon />},
  {text: 'Meal Log', icon: <NotesRoundedIcon />},
  {text: 'Analysis', icon: <AnalyticsRoundedIcon />},
  {text: 'GL FAQS', icon: <InfoRoundedIcon />},
];

const secondaryListItems = [
  {text: 'Settings', icon: <SettingsRoundedIcon />},
  {text: 'Feedback', icon: <HelpRoundedIcon />},
];

function MenuContent(){
  return(
    <Stack sx={{ flexGrow: 1, p: 1, pt: 4, gap: 5}}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{display: 'block'}}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

export default MenuContent