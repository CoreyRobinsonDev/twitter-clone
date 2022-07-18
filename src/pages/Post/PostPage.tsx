import { TiArrowUpOutline, TiArrowDownOutline , TiArrowUpThick, TiArrowDownThick} from "react-icons/ti";
import { AiOutlineRetweet } from "react-icons/ai";
import { RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";

import { setError } from "../../app/features/errorSlice";
import { isVideo } from "../../util/helper";
import CreateComment from "../../components/comment/CreateComment";
import CommentSection from "../../components/comment/CommentSection";
import { useAppDispatch, useAppSelector } from "../../util/hooks";
import { setReposts, setBookmarks, setUpvotes, setDownvotes } from "../../app/features/postSlice";
import { Post_db } from "../../util/types";


const PostPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const { postId } = useParams();
  const [post, setPost] = useState<Post_db | null>(null);
  const currentTime = Math.round(new Date().getTime() / 1000);
  const timestamp = post?.date_post_created ? post?.date_post_created : 0;
  const postAgeInHours = Math.round(((currentTime - timestamp) / 60) / 60);
  const upvotes = useAppSelector(state => state.posts.upvotes);
  const downvotes = useAppSelector(state => state.posts.downvotes);
  const reposts = useAppSelector(state => state.posts.reposts);
  const bookmarks = useAppSelector(state => state.posts.bookmarks);
  const [hasUpvoted, setHasUpvoted] = useState<boolean | null>();
  const [hasDownvoted, setHasDownvoted] = useState<boolean | null>();
  const [hasReposted, setHasReposted] = useState<boolean | null>();
  const [hasBookmarked, setHasBookmarked] = useState<boolean | null>();

  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { id: user?.id },
      url: "http://localhost:4001/post/getAllPostInteractions"
    }).then((res) => {
      dispatch(setReposts(res.data.reposts));
      dispatch(setUpvotes(res.data.upvotes));
      dispatch(setDownvotes(res.data.downvotes));
      dispatch(setBookmarks(res.data.bookmarks));
    }).catch((err) => {
      dispatch(setError(err.response.data));
      navigate("*");
    })
  }, [user, navigate, dispatch])
  
  useEffect(() => {
    setHasUpvoted(upvotes?.includes(postId ? parseInt(postId) : 0))
    setHasDownvoted(downvotes?.includes(postId ? parseInt(postId) : 0))
    setHasReposted(reposts?.includes(postId ? parseInt(postId) : 0))
    setHasBookmarked(bookmarks?.includes(postId ? parseInt(postId) : 0))
  },[bookmarks, reposts, downvotes, upvotes, postId]) 
  
  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { id: postId },
      url: "http://localhost:4001/post/getPostData"
    }).then((res) => setPost(res.data))
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  },[postId, dispatch, navigate])

  const refresh = async () => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { id: postId },
      url: "http://localhost:4001/post/getPostData"
    }).then((res) => setPost(res.data[0]))
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }

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

  return <section>
  <div>
   <img src={post?.profile_photo} alt="Profile" height="100" />
      <div>
        <span>@{post?.username}</span>
        <span>{postAgeInHours > 24 ? Math.floor(postAgeInHours / 24) : postAgeInHours}{postAgeInHours > 24 ? "d" : "h" }</span>
      </div>
      <div>
        <p>{post?.text}</p>
        <figure>
        {
          isVideo(post?.media)
          ? <video controls autoPlay muted><source src={post?.media}></source></video>
          : <img src={post?.media} alt=""></img>
        }
        </figure>
      </div>
      <ul>
       <li>{post?.num_reposts} Reposts</li> 
       <li>{post?.num_upvotes} Upvotes</li> 
       <li>{post?.num_downvotes} Downvotes</li> 
      </ul>
      <div>
        <button onClick={repost}><AiOutlineRetweet />{post?.num_reposts}</button>
        <button onClick={upvote}>{hasUpvoted ? <TiArrowUpThick /> : <TiArrowUpOutline />}{post?.num_upvotes}</button>
        <button onClick={downvote}>{hasDownvoted ? <TiArrowDownThick /> : <TiArrowDownOutline />}{post?.num_downvotes}</button>
        <button onClick={bookmark}>{hasBookmarked ? <RiBookmarkFill/> : <RiBookmarkLine/>}</button>
      </div>
    </div>
    <CreateComment />
    <CommentSection />
  </section>
}

export default PostPage;
