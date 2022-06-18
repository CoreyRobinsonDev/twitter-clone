import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import NavBar from '../components/navbar/NavBar';
import Home from '../components/pages/home/Home';
import Explore from '../components/pages/explore/Explore';
import Messages from '../components/pages/messages/Messages';
import Notifs from '../components/pages/notifications/Notifs';
import Bookmarks from '../components/pages/bookmarks/Bookmarks';
import Profile from '../components/pages/profile/Profile';
import Settings from '../components/pages/settings/Settings';
import ErrorPage from '../components/pages/error-page/ErrorPage';
import Login from '../components/pages/log-in/Login';
import Register from '../components/pages/register/Register';


function App() {
  return <Router>
    <h1>Bitter</h1>
    <NavBar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifs />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  </Router>    
}

export default App;
