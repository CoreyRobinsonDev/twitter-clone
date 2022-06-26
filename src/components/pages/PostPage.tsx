import { BiUpvote, BiDownvote } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { RiBookmarkLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

import { setError } from "../../app/features/errorSlice";
import { isVideo, getPostById } from "../../util/helper";
import CreateComment from "../comment/CreateComment";
import CommentSection from "../comment/CommentSection";
import { useAppDispatch, useAppSelector } from "../../util/hooks";
import { updatePost } from "../../app/features/postSlice";


const PostPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const posts = useAppSelector(state => state.posts.posts);
  const { postId } = useParams();
  const post = posts?.find(({ id }) => id === parseInt(postId ? postId : ""));
  const currentTime = Math.round(new Date().getTime() / 1000);
  const timestamp = post?.date_post_created ? post?.date_post_created : 0;
  const postAgeInHours = Math.round(((currentTime - timestamp) / 60) / 60);
  

  const refresh = async () => {
    if (postId) dispatch(updatePost({ id: parseInt(postId), post: await getPostById(parseInt(postId)) }))
  }

  const upvote = () => {
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

  return <section>
   <img src={post?.profile_photo} alt="Profile" height="100" />
    <div>
      <div>
        <span>@{post?.username}</span>
        <span>{postAgeInHours}h</span>
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
        <button onClick={repost}><AiOutlineRetweet /></button>
        <button onClick={upvote}><BiUpvote /></button>
        <button onClick={downvote}><BiDownvote /></button>
        <button><RiBookmarkLine></RiBookmarkLine></button>
      </div>
    </div>
    <CreateComment />
    <CommentSection />
  </section>
}

export default PostPage;