import axios from "axios";
import { useState, useEffect } from "react";

import { Post_db } from "../../util/types";
import Post from "../post/Post";

export default function Home() {
  const [postData, setPostData] = useState<null | Post_db[] >(null);

  const getPosts = () => {
    axios
      .get("http://localhost:4001/")
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => console.error(error))
  }
  
  useEffect(() => {
    getPosts();
  }, [])
  
  return <section>
    {postData?.map((data) => <Post
      username={data.username}
      pfp={data.profile_photo}
      text={data.text}
      media={data.media}
      numOfComments={data.num_comments}
      numOfReposts={data.num_reposts}
      upvotes={data.num_upvotes}
      downvotes={data.num_downvotes}
      timestamp={data.date_post_created}
    />)}
  </section>
}