import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import { useAppDispatch } from "../../util/hooks";
import { setError } from "../../app/features/errorSlice";
import { setPosts } from "../../app/features/postSlice";
import Post from "../post/Post";
import CreatePost from "../post/CreatePost";


const Home = () => {
  const [numOfPosts, setNumOfPosts] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const posts = [];


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
        navigate("../*")
      })
    }, [navigate, dispatch])
    
  for (let i = 0; i < numOfPosts; i++) {
    posts.push(<Post key={i} num={i} />)
  }
    

  return <section>
    <CreatePost />
    {posts}
  </section>
}

export default Home;