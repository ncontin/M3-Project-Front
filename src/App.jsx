import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import Spots from "./pages/Spots";
import London from "./pages/London";
import SpotDetails from "./pages/SpotDetails";
import CreateSpot from "./pages/CreateSpot";
import Rome from "./pages/Rome";
import Barcelona from "./pages/Barcelona";
import UpdatePage from "./pages/UpdatePage";
import Error404Page from "./pages/Error404Page";
import Error500Page from "./pages/Error500Page";

function App() {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Navbar />
        <Routes>
          <Route path="/error-500" element={<Error500Page />} />
          <Route path="/*" element={<Error404Page />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/spots" element={<Spots />} />
          <Route path="/spots/london" element={<London title={"London"} />} />
          <Route path="/spots/london/:spotId" element={<SpotDetails />} />

          <Route path="/spots/rome" element={<Rome />} />
          <Route path="/spots/rome/:spotId" element={<SpotDetails />} />
          <Route path="/spots/barcelona" element={<Barcelona />} />
          <Route path="/spots/barcelona/:spotId" element={<SpotDetails />} />
          <Route path="/spots/update/:spotId" element={<UpdatePage />} />
          <Route
            path="/spots/create"
            element={
              <PrivateRoute>
                <CreateSpot />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              // <ProfilePage />
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
