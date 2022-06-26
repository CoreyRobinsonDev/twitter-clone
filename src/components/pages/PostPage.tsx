import { BiUpvote, BiDownvote } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { RiBookmarkLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

import { setError } from "../../app/features/errorSlice";
import { Post_db } from "../../util/types";
import { isVideo } from "../../util/helper";
import CreateComment from "../comment/CreateComment";
import CommentSection from "../comment/CommentSection";
import { useAppDispatch } from "../../util/hooks";

const PostPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const [data, setData] = useState<Post_db | null>(null);
  const currentTime = Math.round(new Date().getTime() / 1000);
  const timestamp = data?.date_post_created ? data?.date_post_created : 0;
  const postAgeInHours = Math.round(((currentTime - timestamp) / 60) / 60);
  

  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        id: postId
      },
      url: "http://localhost:4001/post/getPostData"
    }).then((res) => setData(res.data[0]))
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }, [postId, navigate, dispatch])

  return <section>
   <img src={data?.profile_photo} alt="Profile" height="100" />
    <div>
      <div>
        <span>@{data?.username}</span>
        <span>{postAgeInHours}h</span>
      </div>
      <div>
        <p>{data?.text}</p>
        <figure>
        {
          isVideo(data?.media)
          ? <video controls autoPlay muted><source src={data?.media}></source></video>
          : <img src={data?.media} alt=""></img>
        }
        </figure>
      </div>
      <ul>
       <li>{data?.num_reposts} Reposts</li> 
       <li>{data?.num_upvotes} Upvotes</li> 
       <li>{data?.num_downvotes} Downvotes</li> 
      </ul>
      <div>
        <button><AiOutlineRetweet /></button>
        <button><BiUpvote /></button>
        <button><BiDownvote /></button>
        <button><RiBookmarkLine></RiBookmarkLine></button>
      </div>
    </div>
    <CreateComment />
    <CommentSection />
  </section>
}

export default PostPage;