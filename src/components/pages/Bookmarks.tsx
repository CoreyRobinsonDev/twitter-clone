import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { setPosts } from "../../app/features/postSlice";
import { setError } from "../../app/features/errorSlice";
import { useAppDispatch, useAppSelector } from "../../util/hooks";
import Post from "../post/Post";

const Bookmarks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const posts = useAppSelector(state => state.posts.posts);
  const [numOfPosts, setNumOfPosts] = useState(0);
  const feed = [];

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4001/bookmark/"
    }).then((res) => {
      dispatch(setPosts(res.data));
      setNumOfPosts(res.data.length);
    })
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  },[navigate, dispatch])
  
  for (let i = 0; i < numOfPosts; i++) {
    const id = posts?.[i].id;
    feed.push(<Post key={i} postId={id} repost={posts?.[i].repost} />)
  }
  return <section>
    {feed}
  </section>
}

export default Bookmarks;