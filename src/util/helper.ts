import { updatePost } from "../app/features/postSlice";
import Axios from "axios";
import { Post_db } from "./types";


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

  const result: Post_db | boolean = await Axios({ method: "POST", withCredentials: true, data: { id }, url: "http://localhost:4001/post/getPostData" })
    .then((res) => res.data[0])
    .catch((err) => false)  
 
  return result;
}