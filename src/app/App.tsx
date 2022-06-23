import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../util/hooks';

import './App.css';
import NavBar from '../components/NavBar';
import Home from '../components/pages/Home';
import Explore from '../components/pages/Explore';
import Messages from '../components/pages/Messages';
import Notifs from '../components/pages/Notifs';
import Bookmarks from '../components/pages/Bookmarks';
import Profile from '../components/pages/Profile';
import Settings from '../components/pages/Settings';
import ErrorPage from '../components/pages/ErrorPage';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import PostPage from '../components/pages/PostPage';


function App() {
  const user = useAppSelector(state => state.user.user);

  
  return <>
    <header>        
      <h1>Bitter</h1>
      <NavBar />
    </header>
    <main>
      <Routes>
        {user && <>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/notifications" element={<Notifs />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />   
            <Route path="/post/:postId" element={<PostPage />} />
          </>
        }
        <Route path="/register" element={<Register />} />   
        <Route path="/" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  </>     
}

export default App;
