
export type Post = {
  pfp: string,
  username: string,
  text: string,
  media: string,
  timestamp: number,
  numOfComments: number,
  numOfReposts: number,
  upvotes: number,
  downvotes: number
}

export type Post_db = {
  username: string,
  profile_photo: string,
  text: string,
  media: string,
  date_post_created: number,
  num_comments: number,
  num_upvotes: number,
  num_downvotes: number,
  num_reposts: number
}
