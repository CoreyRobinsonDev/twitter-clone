import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import { useAppDispatch, useAppSelector } from "../../util/hooks";
import { setError } from "../../app/features/errorSlice";
import { User as UserType } from "../../util/types";

type Props = {
  userId: number | undefined
}

const User: React.FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<UserType | null>(null);
  const loggedUser = useAppSelector(state => state.user.user);
  const followerList = useAppSelector(state => state.user.followers);
  const followingList = useAppSelector(state => state.user.following);
  const isFollowing = followingList?.includes(userId ? userId : 0);
  const isFollower = followerList?.includes(userId ? userId : 0);
  const isYou = userId === loggedUser?.id;

  useEffect(() => {
    Axios({
      method: "POST",
      data: { user_id: userId },
      url: "/user/getAllUserData"
    }).then((res) => setUser(res.data))
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }, [navigate, dispatch, userId])
  
  
  return <div onClick={() => navigate(`/profile/${userId}`)}>
    <img src={user?.profile_photo} alt="" />
    <div>
      <p>@{user?.username}</p>
      <p>{user?.bio}</p>
      {isFollowing && isFollower
        ? <p>You follow each other</p>
        : isFollower
          ? <p>Follows you</p>
          : isFollowing
            ? <p>Following</p>
            : isYou
              ? <p>You</p>
              : ""}
    </div>
  </div>
}

export default User;