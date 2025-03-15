import React, { useEffect } from "react";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import getDashboardTheme from "../theme/getDashboardTheme";
import SideMenu from "../Components/SideMenu";
import AppNavbar from "../Components/AppNavbar";
import Header from "../Components/Header";
import MainGrid from "../Components/MainGrid";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const dashboardTheme = createTheme(getDashboardTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const { loadUser } = useUser();
  const navigate = useNavigate();

  const handleReload = React.useCallback(() => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch("https://smartfood-api.onrender.com/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data && data.id) {
            fetch(`https://smartfood-api.onrender.com/profile/${data.id}`, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            })
              .then((resp) => resp.json())
              .then((user) => {
                if (user && user.email) {
                  loadUser(user);
                  navigate("/");
                }
              });
          }
        })
        .catch(console.log);
    } else {
      navigate("/signin");
    }
  }, [loadUser, navigate]);

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    // const savedMode = localStorage.getItem('themeMode');
    // if (savedMode) {
    //   setMode(savedMode);
    // } else {
    //   // If no preference is found, it uses system preference
    //   const systemPrefersDark = window.matchMedia(
    //     '(prefers-color-scheme: dark)',
    //   ).matches;
    //   setMode(systemPrefersDark ? 'dark' : 'light');
    // }
    setMode("light");
    handleReload();
  }, []);

  // const toggleColorMode = () => {
  //   const newMode = mode === 'dark' ? 'light' : 'dark';
  //   setMode(newMode);
  //   localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  // };

  // const toggleCustomTheme = () => {
  //   setShowCustomTheme((prev) => !prev);
  // };

  return (
    <div>
      <ThemeProvider theme={showCustomTheme ? dashboardTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <Box sx={{ display: "flex" }}>
          <SideMenu />
          <AppNavbar />
          {/* Main Content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: alpha(theme.palette.background.default, 1),
              overflow: "auto",
            })}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: "center",
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
