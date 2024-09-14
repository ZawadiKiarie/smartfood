import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { CustomIcon } from './CustomIcon';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

function AppAppBar(){
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  }

  return(
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        mt: 5
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            px: 0
          }}>
            <CustomIcon />
            <Box sx={{
              display: {xs: 'none', md: 'flex' }
            }}>
              <Button variant="text" color="info" size="small" href="#features">Features</Button>
              <Button variant="text" color="info" size="small" href="#highlights">Highlights</Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }} href="#faq">FAQ</Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }} href="#">Blog</Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center'
            }}
          >
            <Button
              component={RouterLink}
              to="/signin" 
              color="primary" variant="text" size="small">
              Sign in
            </Button>
            <Button 
              component={RouterLink}
              to="/signup"
              color="primary" variant="contained" size="small">
              Sign up
            </Button>
          </Box>
          <Box
            sx={{ display: {sm: 'flex', md: 'none'} }}
          >
            <IconButton aria-label='Menu button' onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: 'background.default'
                }}
              >
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3}} />
                <Button variant="text" href="#features" fullWidth sx={{ justifyContent: 'flex-start' }} onClick={toggleDrawer(false)}>Features</Button>
                <Button variant="text" href="#highlights" fullWidth sx={{ justifyContent: 'flex-start' }} onClick={toggleDrawer(false)}>Highlights</Button>
                <Button variant="text" href="#faq" fullWidth sx={{ justifyContent: 'flex-start' }} onClick={toggleDrawer(false)}>FAQ</Button>
                <Button variant="text" href="#" fullWidth sx={{ justifyContent: 'flex-start' }} onClick={toggleDrawer(false)}>Blog</Button>
                <MenuItem>
                  <Button
                    component={RouterLink}
                    to="/signup"  
                    color="primary" variant="contained" fullWidth>Sign up</Button>
                </MenuItem>
                <MenuItem>
                  <Button 
                    component={RouterLink}
                    to="/signin" 
                    color="primary" variant="outlined" fullWidth>Sign in</Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  )
}

export default AppAppBar;