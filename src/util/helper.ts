import Axios from "axios";
import { Post_db, Comment} from "./types";


export const isGif = (media: string | undefined) => {
  if (!media) return false;
  
  if (media.slice(-3) === "gif") return true;
  return false;
} 
export const isImage = (media: string | undefined) => {
  if (!media) return false;
 
  if (media.slice(-3) === "jpg" || media.slice(-3) === "png") return true;
  return false;
}
export const isVideo = (media: string | undefined) => {
  if (!media) return false;
 
  if (media.slice(-3) === "mp4") return true;
  return false;
}
export const isURL = (media: string | undefined) => {
  if (!media) return false;

  if (isGif(media) || isImage(media) || isVideo(media)) return false;
  return true;
}

// returns data for the provided post
// returns false if post doesn't exist or server error
export const getPostById = async (id: number) => {

  const result: Post_db | boolean = await Axios({ method: "POST", withCredentials: true, data: { id }, url: "https://not-twitter-crd.herokuapp.com/post/getPostData" })
    .then((res) => res.data[0])
    .catch((err) => false)  
 
  return result;
}

export const getCommentById = async (id: number) => {

  const result: Comment | boolean = await Axios({ method: "POST", withCredentials: true, data: { id }, url: "https://not-twitter-crd.herokuapp.com/comment/getCommentData" })
    .then((res) => res.data[0])
    .catch((err) => false)  
 
  return result;
}
