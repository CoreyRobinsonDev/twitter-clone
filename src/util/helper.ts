export const isGif = (media: string) => {
    if (media.slice(-3) === "gif") return true;
    return false;
  } 
export const isImage = (media: string) => {
    if (media.slice(-3) === "jpg" || media.slice(-3) === "png") return true;
    return false;
  }
export const isVideo = (media: string) => {
  if (media.slice(-3) === "mp4") return true;
  return false;
}
export const isURL = (media: string) => {
    if (isGif(media) || isImage(media) || isVideo(media)) return false;
    return true;
  }