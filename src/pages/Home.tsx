import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import { useAppDispatch, useAppSelector } from "../util/hooks";
import { setError } from "../app/features/errorSlice";
import { setPosts } from "../app/features/postSlice";
import Post from "../pages/Post/Post";
import CreatePost from "../pages/Post/CreatePost";


const Home = () => {
  const [numOfPosts, setNumOfPosts] = useState(0);
  const posts = useAppSelector(state => state.posts.posts);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const feed = [];


  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4001/"
    })
      .then((res) => {
        setNumOfPosts(res.data.length);
        dispatch(setPosts(res.data))
      })
      .catch((err) => {
        dispatch(setError(err.response.data))
      })
    // adding numOfPosts as a dependency assures that setPosts is called on mount 
  }, [navigate, dispatch, numOfPosts])
    
    
  for (let i = 0; i < numOfPosts; i++) {
    const id = posts?.[i].id;
    feed.push(<Post key={i} postId={id} />)
  }
  return <section>
    <CreatePost />
    {feed}
  </section>
}

export default Home;
