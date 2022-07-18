import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../util/hooks';
import { useEffect } from 'react';
import Axios from 'axios';

import './App.css';
import { setBookmarks, setPosts, setReposts, setUpvotes, setDownvotes } from "../app/features/postSlice";
import { setFollowers, setFollowing } from "../app/features/userSlice";
import { setUser } from './features/userSlice';
import { setError } from './features/errorSlice';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import Explore from '../pages/Explore/Explore';
import Messages from '../pages/Messages';
import Notifs from '../pages/Notifs';
import Bookmarks from '../pages/Bookmarks';
import Settings from '../pages/Settings';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PostPage from '../pages/Post/PostPage';
import UserProfile from '../pages/UserProfile';


function App() {
  const user = useAppSelector(state => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "/"
    })
      .then((res) => {
        dispatch(setPosts(res.data))
      })
      .catch((err) => {
        dispatch(setError(err.response.data))
        navigate("*")
      })
  }, [navigate, dispatch])


  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { id: user?.id },
      url: "/post/getAllPostInteractions"
    }).then((res) => {
      dispatch(setReposts(res.data.reposts));
      dispatch(setUpvotes(res.data.upvotes));
      dispatch(setDownvotes(res.data.downvotes));
      dispatch(setBookmarks(res.data.bookmarks));
    }).catch((err) => {
      dispatch(setError(err.response.data));
      navigate("*");
    })
  }, [user, navigate, dispatch])


  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "/user"
    }).then((res) => dispatch(setUser(res.data)))
      .catch((err) => {
        dispatch(setError(err.response.data))
        navigate("*")
      })
  }, [dispatch, navigate])

  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { user_id: user?.id },
      url: "/user/getFollowers"
    }).then((res) => dispatch(setFollowers(res.data)))
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }, [user, navigate, dispatch])

  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { follower_id: user?.id },
      url: "/user/getFollowing"
    }).then((res) => dispatch(setFollowing(res.data)))
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }, [user, navigate, dispatch])
  
  return <>
    <header>        
      <h1>Not <s>Twitter</s></h1>
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
          <Route path="/profile/:userId" element={<UserProfile/>} />
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
