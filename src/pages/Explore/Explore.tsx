import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../util/hooks";
import { setError } from "../../app/features/errorSlice";
import { User } from "../../util/types";
import Post from "../Post/Post";

const Explore = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [usersArr, setUsersArr] = useState<number[]>();
  const [postsArr, setPostsArr] = useState<number[]>();

  const search = (query: string) => {
    if (query.length === 0) return;

    Axios({
      method: "POST",
      withCredentials: true,
      data: { username: query },
      url: "http://localhost:4001/user/getIdByUsername"
    }).then((res) => setUsersArr(res.data))

    Axios({
      method: "POST",
      withCredentials: true,
      data: { text: query },
      url: "http://localhost:4001/post/getIdByText"
    }).then((res) => setPostsArr(res.data))

  }

  console.log(postsArr)
  return <section>
    <input type="text" onChange={(e) => search(e.target.value)} autoFocus />
    <ul>
      <li><button>For You</button></li>
      <li><button>Trending</button></li>
      <li><button>News</button></li>
      <li><button>Sports</button></li>
      <li><button>Entertainment</button></li>
    </ul>
    <div>
      {postsArr?.map((postId, key) => <Post key={key} postId={postId} />)}
    </div>
  </section>
}
export default Explore;