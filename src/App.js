import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Landing from "./Pages/Landing";
import Signup from "./Pages/SignUp";
import SignIn from "./Pages/Signin";
import { UserProvider } from "./context/UserContext";
import { useUser } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
