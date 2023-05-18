import "./App.css";
import Navbar from "./components/Navbar";
import SignupPage from "../pages/SignupPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
