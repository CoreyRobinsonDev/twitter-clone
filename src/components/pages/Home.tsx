import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import { useAppDispatch, useAppSelector } from "../../util/hooks";
import { setError } from "../../app/features/errorSlice";
import { setBookmarks, setPosts, setReposts, setUpvotes, setDownvotes } from "../../app/features/postSlice";
import Post from "../post/Post";
import CreatePost from "../post/CreatePost";


const Home = () => {
  const [numOfPosts, setNumOfPosts] = useState(0);
  const posts = useAppSelector(state => state.posts.posts);
  const user = useAppSelector(state => state.user.user);
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
        navigate("*")
      })
  }, [navigate, dispatch])


  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { id: user?.id },
      url: "http://localhost:4001/post/getAllPostInteractions"
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
    
  for (let i = 0; i < numOfPosts; i++) {
    const id = posts?.[i].id
    feed.push(<Post key={i} postId={id} />)
  }
    
  return <section>
    <CreatePost />
    {feed}
  </section>
}

export default Home;