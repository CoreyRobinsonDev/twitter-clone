import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../util/hooks";
import { setError } from "../../app/features/errorSlice";
import User  from "./User";
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
      url: "https://not-twitter-crd.herokuapp.com/user/getIdByUsername"
    }).then((res) => setUsersArr(res.data))
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })

    Axios({
      method: "POST",
      withCredentials: true,
      data: { text: query },
      url: "https://not-twitter-crd.herokuapp.com/post/getIdByText"
    }).then((res) => setPostsArr(res.data))
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })

  }

  
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
      {usersArr?.map((userId, key) => <User key={key} userId={userId} />)}
      {postsArr?.map((postId, key) => <Post key={key} postId={postId} />)}
    </div>
  </section>
}
export default Explore;