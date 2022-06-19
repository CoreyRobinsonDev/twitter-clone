import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import { Post_db, Props } from "../../../util/types";
import Post from "../../post/Post";


const Home:React.FC<Props> = ({user}) => {
  const [postData, setPostData] = useState<null | Post_db[]>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("../login");
  }, [user, navigate])


  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4001/"})
      .then((res) => setPostData(res.data))
      .catch((error) => {
        navigate("*");
        console.error(error);
      })
    

    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4001/user"
    }).then((response) => console.log(response.data))
  }, [navigate])

  
  
  return <section>
    {postData
      ? postData?.map((data, key) => <Post
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
      : ""
  }
  </section>
}

export default Home;