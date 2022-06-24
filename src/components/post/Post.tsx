import { useNavigate } from "react-router-dom";
import { BiMessage, BiUpvote, BiDownvote } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { RiBookmarkLine } from "react-icons/ri";

import { isVideo } from "../../util/helper";
import { useAppSelector } from "../../util/hooks";

type Props = {
  num: number
}

const Post:React.FC<Props> = ({ num }) => {
  const navigate = useNavigate();
  const posts = useAppSelector(state => state.post.posts);
  const post = posts?.[num];
  const currentTime = Math.round(new Date().getTime() / 1000);
  const postAgeInHours = Math.round(((currentTime - (post?.date_post_created ? post?.date_post_created : 0)) / 60) / 60);
  

  return <article>
    <img src={post?.profile_photo} alt="Profile" height="100" />
    <div>
      <div>
        <span>@{post?.username}</span>
        <span>{postAgeInHours}h</span>
      </div>
      <div onClick={() => navigate(`/post/${post?.id}`)}>
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
        <button><BiMessage />{post?.num_comments}</button>
        <button><AiOutlineRetweet />{post?.num_reposts}</button>
        <button><BiUpvote />{post?.num_upvotes}</button>
        <button><BiDownvote />{post?.num_downvotes}</button>
        <button><RiBookmarkLine></RiBookmarkLine></button>
      </div>
    </div>
  </article>
}

export default Post;