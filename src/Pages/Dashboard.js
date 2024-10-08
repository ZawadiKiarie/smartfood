import React from 'react';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import getDashboardTheme from '../theme/getDashboardTheme';
import TemplateFrame from '../Components/TemplateFrame';
import SideMenu from '../Components/SideMenu';
import AppNavbar from '../Components/AppNavbar';
import Header from '../Components/Header';
import MainGrid from '../Components/MainGrid';

function Dashboard() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const dashboardTheme = createTheme(getDashboardTheme(mode));
  const defaultTheme = createTheme({ palette: { mode }})

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };


  return (
      <div>
        <ThemeProvider theme={showCustomTheme ? dashboardTheme : defaultTheme}>
          <CssBaseline enableColorScheme />
          <Box sx={{ display: 'flex' }}>
            <SideMenu />
            <AppNavbar />
            {/* Main Content */}
            <Box
              component="main"
              sx={(theme) => ({
                flexGrow: 1,
                backgroundColor: alpha(theme.palette.background.default, 1),
                overflow: 'auto',
              })}
            >
              <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                mx: 3,
                pb: 10,
                mt: { xs: 8, md: 0 },
              }}
              >
                <Header />
                <MainGrid />
              </Stack>
            </Box>
          </Box>
        </ThemeProvider>
        
      </div>
  );
}

export default Dashboard;