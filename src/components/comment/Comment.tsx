import { BiUpvote, BiDownvote } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { isVideo } from "../../util/helper";
import { useAppDispatch, useAppSelector } from "../../util/hooks";
import { setError } from "../../app/features/errorSlice";
import { User } from "../../util/types";

type Props = {
  num: number
}

const Comment: React.FC<Props> = ({ num }) => {
  const [data, setData] = useState<User | null>(null);
  const comments = useAppSelector(state => state.comment.comments);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const comment = comments?.[num];
  
  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: {user_id: comment?.poster_id},
      url: "http://localhost:4001/user/getUserData"
    }).then((res) => setData(res.data))
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }, [dispatch, navigate, comment])



  return <div>
    <img src={data?.profile_photo} alt="Profile" />
    <div>
      <span>@{data?.username}</span>
    </div>
    <div>
      <p>{comment?.text}</p>
      <figure>
        {
          isVideo(comment?.media)
            ? <video controls autoPlay muted><source src={comment?.media}></source></video>
            : <img src={comment?.media} alt="" />
        }
      </figure>
    </div>
    <div>
      <button><AiOutlineRetweet />{comment?.num_reposts}</button>
      <button><BiUpvote />{comment?.num_upvotes}</button>
      <button><BiDownvote />{comment?.num_downvotes}</button>
    </div>
  </div>
}

export default Comment;