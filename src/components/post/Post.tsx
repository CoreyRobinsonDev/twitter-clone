import { useNavigate, Link } from "react-router-dom";
import { BiMessage, BiUpvote, BiDownvote } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { RiBookmarkLine } from "react-icons/ri";
import Axios from "axios";

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


  const refresh = async () => {
    if (postId) dispatch(updatePost({ id: postId, post: await getPostById(postId) }))
  }

  const upvote = () => {
    console.log(postId)
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
        <button onClick={upvote}><BiUpvote />{post?.num_upvotes}</button>
        <button onClick={downvote}><BiDownvote />{post?.num_downvotes}</button>
        <button><RiBookmarkLine></RiBookmarkLine></button>
      </div>
    </div>
  </article>
}

export default Post;