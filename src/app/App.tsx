import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../util/hooks';
import { useEffect } from 'react';
import Axios from 'axios';

import './App.css';
import { setUser } from './features/userSlice';
import { setError } from './features/errorSlice';
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4001/user"
    }).then((res) => dispatch(setUser(res.data)))
      .catch((err) => {
        dispatch(setError(err.response.data))
        navigate("*")
      })
  }, [dispatch, navigate])

  
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
