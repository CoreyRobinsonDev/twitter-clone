import { TiArrowUpOutline, TiArrowDownOutline , TiArrowUpThick, TiArrowDownThick} from "react-icons/ti";
import { AiOutlineRetweet } from "react-icons/ai";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { isVideo, getCommentById } from "../../util/helper";
import { useAppDispatch, useAppSelector } from "../../util/hooks";
import { setError } from "../../app/features/errorSlice";
import {updateComment} from "../../app/features/commentSlice";
import { Link } from "react-router-dom";

type Props = {
  commentId: number | undefined,
  repost: boolean | undefined
}

const Comment: React.FC<Props> = ({ commentId, repost }) => {
  const comments = useAppSelector(state => state.comments.comments);
  const user = useAppSelector(state => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const comment = comments?.find(({id}) => id === commentId);
  const upvotes = useAppSelector(state => state.comments.upvotes);
  const downvotes = useAppSelector(state => state.comments.downvotes);
  const reposts = useAppSelector(state => state.comments.reposts);
  const [hasUpvoted, setHasUpvoted] = useState<boolean | null>();
  const [hasDownvoted, setHasDownvoted] = useState<boolean | null>();
  const [hasReposted, setHasReposted] = useState<boolean | null>();
 
  const refresh = async () => {
    if (commentId) dispatch(updateComment({ id: commentId, comment: await getCommentById(commentId) }))
  }

  useEffect(() => {
    setHasUpvoted(upvotes?.includes(commentId ? commentId : 0))
    setHasDownvoted(downvotes?.includes(commentId ? commentId : 0))
    setHasReposted(reposts?.includes(commentId ? commentId : 0))
  },[reposts, downvotes, upvotes, commentId])

  const upvote = () => {
    if (!hasDownvoted) setHasUpvoted(!hasUpvoted);
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        user_id: user?.id,
        comment_id: commentId
      },
      url: "https://not-twitter-crd.herokuapp.com/comment/upvote"
    }).then((res) => refresh())
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }

  const downvote = () => {
    if (!hasUpvoted) setHasDownvoted(!hasDownvoted);
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        user_id: user?.id,
        comment_id: commentId
      },
      url: "https://not-twitter-crd.herokuapp.com/comment/downvote"
    }).then((res) => refresh())
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }

  const repostFunc = () => {
    setHasReposted(!hasReposted);
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        user_id: user?.id,
        comment_id: commentId
      },
      url: "https://not-twitter-crd.herokuapp.com/comment/repost"
    }).then((res) => refresh())
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }

  return <div>
    <p>{repost ? <><AiOutlineRetweet /> Reposted</> : "" }</p>
    <img src={comment?.profile_photo} alt="Profile" onClick={() => navigate(`/profile/${comment?.poster_id}`)} />
    <div>
      <Link to={`/profile/${comment?.poster_id}`}>@{comment?.username}</Link>
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
      <button onClick={repostFunc}><AiOutlineRetweet />{comment?.num_reposts}</button>
      <button onClick={upvote}>{hasUpvoted ? <TiArrowUpThick /> : <TiArrowUpOutline />}{comment?.num_upvotes}</button>
      <button onClick={downvote}>{hasDownvoted ? <TiArrowDownThick /> : <TiArrowDownOutline />}{comment?.num_downvotes}</button>
    </div>
  </div>
}

export default Comment;
