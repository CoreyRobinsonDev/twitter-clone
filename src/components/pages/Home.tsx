import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import { useAppDispatch } from "../../util/hooks";
import { setUser } from "../../app/features/userSlice";
import { setError } from "../../app/features/errorSlice";
import { Post_db } from "../../util/types";
import Post from "../Post";
import CreatePost from "../CreatePost";


const Home = () => {
  const [postData, setPostData] = useState<null | Post_db[]>(null);
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

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4001/"
    })
      .then((res) => setPostData(res.data))
      .catch((err) => {
        dispatch(setError(err.response.data))
        navigate("../*")
      })
    }, [navigate, dispatch])
    
    console.log(postData)
  return <section>
    <CreatePost />
    {postData
      && postData?.map((data) => <Post
          key={data.id}
          id={data.id}
          username={data.username}
          pfp={data.profile_photo}
          text={data.text}
          media={data.media}
          numOfComments={data.num_comments}
          numOfReposts={data.num_reposts}
          upvotes={data.num_upvotes}
          downvotes={data.num_downvotes}
          timestamp={data.date_post_created}
        />)
    }
  </section>
}

export default Home;