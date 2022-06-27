
export type Post = {
  id: number,
  poster_id: number,
  text: string,
  media: string,
  media_content_type: string,
  date_post_created: number,
  num_comments: number,
  num_reposts: number,
  num_upvotes: number,
  num_downvotes: number
}

export type Post_db = {
  id: number,
  poster_id: number,
  username: string,
  profile_photo: string,
  text: string,
  media: string,
  media_content_type: string,
  date_post_created: number,
  num_comments: number,
  num_upvotes: number,
  num_downvotes: number,
  num_reposts: number
}



export type Comment = {
  id: number,
  poster_id: number,
  text: string,
  media: string,
  num_upvotes: number,
  num_downvotes: number,
  num_reposts: number
}

export type User = {
  banner_photo: string,
  bio: string | null,
  date_acc_created: string,
  id: number,
  num_followers: number,
  num_following: number,
  num_tweets: number,
  password: string,
  profile_photo: string,
  username: string
}

export type Props = {
  user: User | null
}