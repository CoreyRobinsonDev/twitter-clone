import { BiMessage, BiUpvote, BiDownvote } from 'react-icons/bi';
import { AiOutlineRetweet } from 'react-icons/ai';
import { RiBookmarkLine } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";

import { Post as postType } from '../util/types';
import { isVideo } from '../util/helper';

export default function Post({ id, pfp, username, text, media, numOfComments, numOfReposts, upvotes, downvotes, timestamp }: postType) {
  const navigate = useNavigate();
  const currentTime = Math.round(new Date().getTime() / 1000);
  const postAgeInHours = Math.round(((currentTime - timestamp) / 60) / 60);
  

  return <article>
    <img src={pfp} alt="Profile" height="100" />
    <div>
      <div>
        <span>@{username}</span>
        <span>{postAgeInHours}h</span>
      </div>
      <div onClick={() => navigate(`/post/${id}`)}>
        <p>{text}</p>
        <figure>
        {
          isVideo(media)
          ? <video controls autoPlay muted><source src={media}></source></video>
          : <img src={media} alt=""></img>
        }
        </figure>
      </div>
      <div>
        <button><BiMessage />{numOfComments}</button>
        <button><AiOutlineRetweet />{numOfReposts}</button>
        <button><BiUpvote />{upvotes}</button>
        <button><BiDownvote />{downvotes}</button>
        <button><RiBookmarkLine></RiBookmarkLine></button>
      </div>
    </div>
  </article>
}