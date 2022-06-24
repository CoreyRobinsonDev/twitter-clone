import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";

import { useAppDispatch } from "../../util/hooks";
import { setError } from "../../app/features/errorSlice";
import Comment from "./Comment";
import { Comment as commentType } from "../../util/types";


const CommentSection = () => {
  const {postId} = useParams();
  const [data, setData] = useState<commentType[] | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        post_id: postId
      },
      url: "http://localhost:4001/post/getCommentData"
    }).then((res) => setData(res.data))
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
      })
  }, [dispatch, navigate, postId])
    console.log(data)
  
  
  return <article>
    {data
      ? data?.map(comment => <Comment
        key={comment.id}
        id={comment.id}
        poster_id={comment.poster_id}
        text={comment.text}
        media={comment.media}
        num_upvotes={comment.num_upvotes}
        num_downvotes={comment.num_downvotes}
        num_reposts={comment.num_reposts}
      />)
      : ""
    }
  </article>
}

export default CommentSection;