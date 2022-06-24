import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { AiOutlineRetweet } from 'react-icons/ai';
import { isVideo } from "../../util/helper";

type Props = {
  id: number,
  poster_id: number,
  text: string,
  media: string,
  num_upvotes: number,
  num_downvotes: number,
  num_reposts: number
}

const Comment: React.FC<Props> = ({id, poster_id, text, media, num_upvotes, num_downvotes, num_reposts}) => {
  return <div>
    <img src={""} alt="Profile" />
    <div>
      <span>@username</span>
    </div>
    <div>
      <p>{text}</p>
      <figure>
        {
          isVideo(media)
            ? <video controls autoPlay muted><source src={media}></source></video>
            : <img src={media} alt="" />
        }
      </figure>
    </div>
    <div>
      <button><AiOutlineRetweet />{num_reposts}</button>
      <button><BiUpvote />{num_upvotes}</button>
      <button><BiDownvote />{num_downvotes}</button>
    </div>
  </div>
}

export default Comment;