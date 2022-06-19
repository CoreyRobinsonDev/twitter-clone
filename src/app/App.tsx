import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../util/hooks';
import  Axios  from 'axios';

import './App.css';
import { setUser } from './features/userSlice';
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
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4001/user"
    }).then((response) => dispatch(setUser(response.data)))
    .catch((err) => navigate("*"))
  }, [dispatch, user, navigate])
  

  return <>
    <header>        
      <h1>Bitter</h1>
      <NavBar />
    </header>
    <main>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/explore" element={<Explore user={user} />} />
        <Route path="/notifications" element={<Notifs user={user}/>} />
        <Route path="/messages" element={<Messages user={user}/>} />
        <Route path="/bookmarks" element={<Bookmarks user={user}/>} />
        <Route path="/profile" element={<Profile user={user}/>} />
        <Route path="/settings" element={<Settings user={user}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  </>     
}

export default App;
