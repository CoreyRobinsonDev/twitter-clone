import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import { useAppDispatch } from "../../../util/hooks";
import { setError } from "../../../app/features/errorSlice";
import { Post_db } from "../../../util/types";
import Post from "../../post/Post";
import Input from "../../input/Input";


const Home = () => {
  const [postData, setPostData] = useState<null | Post_db[]>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4001/"
    })
      .then((res) => setPostData(res.data))
      .catch((err) => {
        dispatch(setError(err.response.data))
        navigate("*")
      })
  }, [navigate, dispatch])

  
  return <section>
    <Input />
    {postData
      && postData?.map((data, key) => <Post
      key={key}
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