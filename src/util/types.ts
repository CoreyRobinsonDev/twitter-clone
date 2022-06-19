
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

export type User = {
  banner_photo: string | null,
  bio: string | null,
  date_acc_created: string,
  id: number,
  num_followers: number,
  num_following: number,
  num_tweets: number,
  password: string,
  profile_photo: string | null,
  username: string
}

export type Props = {
  user: User | null
}