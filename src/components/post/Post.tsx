import { BiMessage, BiUpvote, BiDownvote } from 'react-icons/bi';
import { AiOutlineRetweet } from 'react-icons/ai';


export default function Post() {
  return <article>
    <img src="https://source.unsplash.com/random" alt="Profile" />
    <div>
      <span>Name</span>
      <span>@Username</span>
      <p>post message</p>
      <div>
        <button><BiMessage /></button>
        <button><AiOutlineRetweet /></button>
        <button><BiUpvote /></button>
        <button><BiDownvote /></button>
      </div>
    </div>
  </article>
}