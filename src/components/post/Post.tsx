import { useNavigate, Link } from "react-router-dom";
import { BiMessage } from "react-icons/bi";
import { TiArrowUpOutline, TiArrowDownOutline, TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";
import { AiOutlineRetweet } from "react-icons/ai";
import { RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import Axios from "axios";
import { useState, useEffect } from "react";

import { isVideo, getPostById } from "../../util/helper";
import { useAppDispatch, useAppSelector } from "../../util/hooks";
import { setError } from "../../app/features/errorSlice";
import { updatePost } from "../../app/features/postSlice";

type Props = {
  postId: number | undefined
}


const Post:React.FC<Props> = ({ postId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const posts = useAppSelector(state => state.posts.posts);
  const post = posts?.find(({ id }) => id === postId);
  const currentTime = Math.round(new Date().getTime() / 1000);
  const postAgeInHours = Math.round(((currentTime - (post?.date_post_created ? post?.date_post_created : 0)) / 60) / 60);
  const upvotes = useAppSelector(state => state.posts.upvotes);
  const downvotes = useAppSelector(state => state.posts.downvotes);
  const reposts = useAppSelector(state => state.posts.reposts);
  const bookmarks = useAppSelector(state => state.posts.bookmarks);
  const [hasUpvoted, setHasUpvoted] = useState<boolean | null>();
  const [hasDownvoted, setHasDownvoted] = useState<boolean | null>();
  const [hasReposted, setHasReposted] = useState<boolean | null>();
  const [hasBookmarked, setHasBookmarked] = useState<boolean | null>();
 

  const refresh = async () => {
    if (postId) dispatch(updatePost({ id: postId, post: await getPostById(postId) }))
  }

  useEffect(() => {
    setHasUpvoted(upvotes?.includes(postId ? postId : 0))
    setHasDownvoted(downvotes?.includes(postId ? postId : 0))
    setHasReposted(reposts?.includes(postId ? postId : 0))
    setHasBookmarked(bookmarks?.includes(postId ? postId : 0))
  },[bookmarks, reposts, downvotes, upvotes, postId])

  const upvote = () => {
    if (!hasDownvoted) setHasUpvoted(!hasUpvoted);
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        user_id: user?.id,
        post_id: postId
      },
      url: "http://localhost:4001/post/upvote"
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
        post_id: postId
      },
      url: "http://localhost:4001/post/downvote"
    }).then((res) => refresh())
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }

  const repost = () => {
    setHasReposted(!hasReposted);
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        user_id: user?.id,
        post_id: postId
      },
      url: "http://localhost:4001/post/repost"
    }).then((res) => refresh())
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }

  const bookmark = () => {
    setHasBookmarked(!hasBookmarked);
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        user_id: user?.id,
        post_id: postId
      },
      url: "http://localhost:4001/post/bookmark"
    }).then((res) => refresh())
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }

  return <article>
    <img src={post?.profile_photo} alt="Profile" onClick={() => navigate(`/profile/${post?.poster_id}`)} height="100" />
    <div>
      <div>
        <Link to={`/profile/${post?.poster_id}`}>@{post?.username}</Link>
        <span>{postAgeInHours}h</span>
      </div>
      <div onClick={() => navigate(`/post/${postId}`)}>
        <p>{post?.text}</p>
        <figure>
        {
          isVideo(post?.media)
          ? <video controls autoPlay muted><source src={post?.media}></source></video>
          : <img src={post?.media} alt=""></img>
        }
        </figure>
      </div>
      <div>
        <button onClick={() => navigate(`/post/${postId}`)}><BiMessage />{post?.num_comments}</button>
        <button onClick={repost}><AiOutlineRetweet />{post?.num_reposts}</button>
        <button onClick={upvote}>{hasUpvoted ? <TiArrowUpThick /> : <TiArrowUpOutline />}{post?.num_upvotes}</button>
        <button onClick={downvote}>{hasDownvoted ? <TiArrowDownThick /> : <TiArrowDownOutline />}{post?.num_downvotes}</button>
        <button onClick={bookmark}>{hasBookmarked ? <RiBookmarkFill/> : <RiBookmarkLine/>}</button>
      </div>
    </div>
  </article>
}

export default Post;