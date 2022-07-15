import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { ImArrowLeft } from "react-icons/im";

import { setError } from "../app/features/errorSlice";
import { setPosts, setReposts, setUpvotes, setDownvotes, setBookmarks } from "../app/features/postSlice";
import { setComments, setCommentsDownvotes, setCommentsReposts, setCommentsUpvotes } from "../app/features/commentSlice";
import { setFollowers, setFollowing } from "../app/features/userSlice";
import { useAppDispatch, useAppSelector } from "../util/hooks";
import { User } from "../util/types";
import Post from "./Post/Post";
import Comment from "../components/comment/Comment";

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [numOfPosts, setNumOfPosts] = useState(0);
  const followerList = useAppSelector(state => state.user.followers);
  const followingList = useAppSelector(state => state.user.following);
  const loggedUser = useAppSelector(state => state.user.user);
  const posts = useAppSelector(state => state.posts.posts);
  const { userId } = useParams();
  const [isFollowing, setIsFollowing] = useState(followingList?.includes(userId ? parseInt(userId) : 0));
  const [isFollower] = useState(followerList?.includes(userId ? parseInt(userId) : 0));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const feed = [];

  console.log(isFollowing, isFollower)
  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: {id: userId},
      url: "http://localhost:4001/post/getUserPosts"
    }).then((res) => {
      dispatch(setPosts(res.data));
      dispatch(setComments(res.data));
      setNumOfPosts(res.data.length);
    })
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }, [userId, dispatch, navigate])

  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { user_id: userId },
      url: "http://localhost:4001/user/getAllUserData"
    }).then((res) => setUser(res.data))
    .catch((err) => {
      dispatch(setError(err.response.data));
      navigate("*");
    })
  }, [dispatch, navigate, userId])

  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { id: loggedUser?.id },
      url: "http://localhost:4001/post/getAllPostInteractions"
    }).then((res) => {
      dispatch(setReposts(res.data.reposts));
      dispatch(setUpvotes(res.data.upvotes));
      dispatch(setDownvotes(res.data.downvotes));
      dispatch(setBookmarks(res.data.bookmarks));
    }).catch((err) => {
      dispatch(setError(err.response.data));
      navigate("*");
    })
  }, [loggedUser, navigate, dispatch])

  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { id: loggedUser?.id },
      url: "http://localhost:4001/comment/getAllCommentInteractions"
    }).then((res) => {
      dispatch(setCommentsReposts(res.data.reposts));
      dispatch(setCommentsUpvotes(res.data.upvotes));
      dispatch(setCommentsDownvotes(res.data.downvotes));
    }).catch((err) => {
      dispatch(setError(err.response.data));
      navigate("*");
    })
  }, [loggedUser, navigate, dispatch])

  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { user_id: loggedUser?.id },
      url: "http://localhost:4001/user/getFollowers"
    }).then((res) => dispatch(setFollowers(res.data)))
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }, [loggedUser, navigate, dispatch])

  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { follower_id: loggedUser?.id },
      url: "http://localhost:4001/user/getFollowing"
    }).then((res) => dispatch(setFollowing(res.data)))
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }, [loggedUser, navigate, dispatch])

  const follow = () => {
    if (isFollowing) {
      Axios({
        method: "POST",
        withCredentials: true,
        data: {
          user_id: userId,
          follower_id: loggedUser?.id
        },
        url: "http://localhost:4001/user/unfollow"
      }).then((res) => setIsFollowing(!isFollowing))
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
      })
    } else { 
      Axios({
        method: "POST",
        withCredentials: true,
        data: {
          user_id: userId,
          follower_id: loggedUser?.id
        },
        url: "http://localhost:4001/user/follow"
      }).then((res) => setIsFollowing(!isFollowing))
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
      })
    }
  }
    

  for (let i = 0; i < numOfPosts; i++) {
    const id = posts?.[i].id;
    if (typeof posts?.[i].media_content_type === "undefined") {
      feed.push(<Comment key={i} commentId={id} repost={posts?.[i].repost} />)
    } else {
      feed.push(<Post key={i} postId={id}  />)
    }
  }

    return <>
    <div>
      <Link to="/home"><ImArrowLeft /></Link>
      <p>{user?.username}</p>
      <p>{user?.num_tweets} Posts</p>
    </div>
    <img src={user?.banner_photo} alt="Banner" />
    <section>
      <img src={user?.profile_photo} alt="Profile" />
        {loggedUser?.id === parseInt(userId ? userId : "")
          ? <button>Edit Profile</button>
          : <button onClick={follow}>{ isFollowing ? "Following" : "Follow" }</button>
        }
      <p>{user?.bio}</p>
      <p>Joined {user?.date_acc_created}</p>
      <div>
        <small>{user?.num_following} Following</small>
        <small>{user?.num_followers} Followers</small>
      </div>
    </section>
    <section>
      {feed}  
    </section>
  </>
}

export default UserProfile;