import axios from "axios";
import { useState, useEffect } from "react";

import { RedditResponseObject, ProfilePic } from "../../util/types";
import Post from "../post/Post";

export default function Home() {
  const [data, setData] = useState<RedditResponseObject[]>();
  const [profilePics, setProfilePics] = useState();

  const getPosts = () => {
    axios.get("https://www.reddit.com/r/all.json")
    .then((res) => {
      setData(res.data.data.children);
    })
    axios.get("https://api.unsplash.com/photos/random?collections=people&count=25&orientation=squarish&client_id=4xU23O7Cmjqzpu5erQiSwUTLzmq3F8_XtNXvqk0Y0xA")
      .then((res) => {
      setProfilePics(res.data.map((photo: ProfilePic) => photo.urls.small))
    })
  }
  
  useEffect(() => {
    getPosts();
  }, [])
  
  return <main>
    {data?.map((item, key) => <Post
      key={key}
      pfp={profilePics ? profilePics[key] : ""}
      name={item.data.author}
      username={item.data.author}
      title={item.data.title}
      text={item.data.selftext}
      media={item.data.url}
      numOfComments={item.data.num_comments}
      numOfReposts={item.data.num_crossposts}
      upvotes={item.data.ups}
      downvotes={item.data.downs} />)}
  </main>
}