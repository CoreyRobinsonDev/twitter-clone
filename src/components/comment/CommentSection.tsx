import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";

import { useAppDispatch, useAppSelector } from "../../util/hooks";
import { setError } from "../../app/features/errorSlice";
import { setComments, setCommentsReposts, setCommentsUpvotes, setCommentsDownvotes } from "../../app/features/commentSlice";
import Comment from "./Comment";


const CommentSection = () => {
  const {postId} = useParams();
  const [numComments, setNumComments] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.comments.comments);
  const user = useAppSelector(state => state.user.user);
  const section = [];


  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        post_id: postId
      },
      url: "http://localhost:4001/comment/getCommentSection"
    }).then((res) => {
      setNumComments(res.data.length);
      dispatch(setComments(res.data))
    })
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
      })
  }, [dispatch, navigate, postId])
  
  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { id: user?.id },
      url: "http://localhost:4001/comment/getAllCommentInteractions"
    }).then((res) => {
      dispatch(setCommentsReposts(res.data.reposts));
      dispatch(setCommentsUpvotes(res.data.upvotes));
      dispatch(setCommentsDownvotes(res.data.downvotes));
    }).catch((err) => {
      dispatch(setError(err.response.data));
      navigate("*");
    })
  }, [user, navigate, dispatch])

  for (let i = 0; i < numComments; i++) {
    const id = comments?.[i].id;
    console.log(id);
    section.push(<Comment key={i} commentId={id} />);
  }
  
  return <article>
    {section}
  </article>
}

export default CommentSection;
