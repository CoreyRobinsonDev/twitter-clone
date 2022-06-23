import { BiUpvote, BiDownvote } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { RiBookmarkLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

import { PostPage as postType } from "../../util/types";
import { isVideo } from "../../util/helper";

const PostPage = () => {
  const { postId } = useParams();
  const [data, setData] = useState<postType | null>(null);
  const currentTime = Math.round(new Date().getTime() / 1000);
  const timestamp = data?.post.date_post_created ? data?.post.date_post_created : 0;
  const postAgeInHours = Math.round(((currentTime - timestamp) / 60) / 60);
  

  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        id: postId
      },
      url: "http://localhost:4001/post/getData"
    })
    .then((res) => setData(res.data))
  }, [postId])

  return <section>
   <img src={data?.user.profile_photo} alt="Profile" height="100" />
    <div>
      <div>
        <span>@{data?.user.username}</span>
        <span>{postAgeInHours}h</span>
      </div>
      <div>
        <p>{data?.post.text}</p>
        <figure>
        {
          isVideo(data?.post.media)
          ? <video controls autoPlay muted><source src={data?.post.media}></source></video>
          : <img src={data?.post.media} alt=""></img>
        }
        </figure>
      </div>
      <ul>
       <li>{data?.post.num_comments} Comments</li> 
       <li>{data?.post.num_reposts} Reposts</li> 
       <li>{data?.post.num_upvotes} Upvotes</li> 
       <li>{data?.post.num_downvotes} Downvotes</li> 
      </ul>
      <div>
        <button><AiOutlineRetweet /></button>
        <button><BiUpvote /></button>
        <button><BiDownvote /></button>
        <button><RiBookmarkLine></RiBookmarkLine></button>
      </div>
    </div>
  </section>
}

export default PostPage;