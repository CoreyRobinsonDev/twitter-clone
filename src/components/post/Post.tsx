import { BiMessage, BiUpvote, BiDownvote } from 'react-icons/bi';
import { AiOutlineRetweet } from 'react-icons/ai';
import { RiBookmarkLine } from 'react-icons/ri';
import { useState, useEffect } from "react";

import { Post as postType } from '../../util/types';
import { isURL, isGif, isImage } from '../../util/helper';

export default function Post({ pfp, username, text, media, numOfComments, numOfReposts, upvotes, downvotes, timestamp }: postType) {
  const currentTime = Math.round(new Date().getTime() / 1000);
  const postAge = Math.round(((currentTime - timestamp) / 60) / 60);
    

  return <article>
    <img src={pfp} alt="Profile" height="100" />
    <div>
      <div>
        <span>@{username}</span>
        <span>{postAge}h</span>
      </div>
      <p>{text}</p>
      <img src={media} alt=""></img>
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