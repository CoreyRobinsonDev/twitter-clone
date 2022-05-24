import { BiMessage, BiUpvote, BiDownvote } from 'react-icons/bi';
import { AiOutlineRetweet } from 'react-icons/ai';

import { Post as postType } from '../../util/types';

export default function Post({ pfp, name, username, title, text, media, numOfComments, numOfReposts, upvotes, downvotes }: postType) {
  const isGif = () => {
    if (media.slice(-3) === "gif") return true;
    return false;
  } 
  const isImage = () => {
    if (media.slice(-3) === "jpg" || media.slice(-3) === "png") return true;
    return false;
  }
  const isURL = () => {
    if (isGif() || isImage()) return false;
    return true;
  }
  
  return <article>
    <img src={pfp} alt="Profile" height="100" />
    <div>
      <span>{name}</span>
      <span>@{username}</span>
      <p>{title}</p>
      <p>{text}</p>
      {isURL() ? <a href={media} target="_blank" rel="noreferrer">{media}</a> : ""}
      {isGif() ? <embed src={media}></embed> : ""}
      {isImage() ? <img src={media} alt=""></img> : ""}
      <div>
        <button><BiMessage />{numOfComments}</button>
        <button><AiOutlineRetweet />{numOfReposts}</button>
        <button><BiUpvote />{upvotes}</button>
        <button><BiDownvote />{downvotes}</button>
      </div>
    </div>
  </article>
}