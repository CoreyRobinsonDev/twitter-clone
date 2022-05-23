import axios from "axios";
import { useState, useEffect } from "react";

import { Post as postType } from "../../util/types";
import Post from "../post/Post";

export default function Home() {
  const [posts, setPosts] = useState<postType[]>([{
    pfp: "",
    name: "Bitter Bot",
    username: "Bitter_Bot",
    content: "Welcome to Bitter!",
    numOfComments: 0,
    numOfReposts: 0,
    upvotes: 0,
    downvotes: 0
  }]);

  const getPosts = async () => {
    axios.get("https://www.reddit.com/r/all.json")
      .then((res) => {
        console.log(res.data.data.children);
        const data = res.data.data.children;
        
      })
  }
  useEffect(() => {
    getPosts();
  }, [])
  const arr = [
    {},
    {},
    {},
    {},
    {}];
  return <main>
    {arr.map((item, key) => <Post key={key} />)}
  </main>
}