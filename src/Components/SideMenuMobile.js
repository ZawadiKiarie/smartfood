import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

import MenuButton from './MenuButton';
import MenuContent from './MenuContent';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function SideMenuMobile({ open, toggleDrawer }) {
  const navigate = useNavigate()
  const { user } = useUser();

  const handleLogout = () => {
    //you can perform logout logic here (e.g., clearing user data, tokens etc)
    navigate('/landing-page')
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb:0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt="Riley Carter"
              src="../assets/avatar/avatar1.jpg"
              sx={{ width: 24, height: 24 }}
             />
            <Typography component="p" variant="h6">{user.name}</Typography>
          </Stack>

          <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton>
        </Stack>

        <Divider />

        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>

        <Stack sx={{ p: 2 }}>
          <Button onClick={handleLogout} variant="outlined" fullwidth startIcon={<LogoutRoundedIcon />}>Logout</Button>
        </Stack>

      </Stack>
    </Drawer>
  )
}

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;
