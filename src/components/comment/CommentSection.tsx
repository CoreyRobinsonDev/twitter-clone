import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";

import { useAppDispatch } from "../../util/hooks";
import { setError } from "../../app/features/errorSlice";
import { setComments } from "../../app/features/commentSlice";
import Comment from "./Comment";


const CommentSection = () => {
  const {postId} = useParams();
  const [numComments, setNumComments] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const comments = [];


  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        post_id: postId
      },
      url: "http://localhost:4001/comment/getCommentData"
    }).then((res) => {
      setNumComments(res.data.length);
      dispatch(setComments(res.data))
    })
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
      })
  }, [dispatch, navigate, postId])

  for (let i = 0; i < numComments; i++) {
    comments.push(<Comment key={i} num={i} />);
  }
  
  return <article>
    {comments}
  </article>
}

export default CommentSection;