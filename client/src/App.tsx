import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { HomePage } from './components/pages/HomePage';
import { RequestsPage } from './components/pages/RequestsPage';
import { ProfileSettings } from './components/profile/ProfileSettings';
import { UserAboutPage } from './pages/UserAboutPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/user/:userId/about" element={<UserAboutPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
