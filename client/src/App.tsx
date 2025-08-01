import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { HomePage } from "./components/pages/HomePage";
import { ProfileSettings } from "./components/profile/ProfileSettings";
import { VolunteerDashboard } from "./components/volunteer/VolunteerDashboard";
import { CarerProfile } from "./components/volunteer/VolunteerProfile";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route
              path="/volunteerDashboard"
              element={<VolunteerDashboard />}
            />
            <Route path="/volunteerProfile" element={<CarerProfile />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
