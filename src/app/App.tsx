import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from '../components/navbar/NavBar';
import Home from '../components/home/Home';
import Explore from '../components/explore/Explore';
import Messages from '../components/messages/Messages';
import Notifs from '../components/notifications/Notifs';
import Bookmarks from '../components/bookmarks/Bookmarks';
import Profile from '../components/profile/Profile';
import Settings from '../components/settings/Settings';
import ErrorPage from '../components/error-page/ErrorPage';

function App() {
  return <Router>
    <h1>Bitter</h1>
    <NavBar />    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/notifications" element={<Notifs />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Router>    
}

export default App;
