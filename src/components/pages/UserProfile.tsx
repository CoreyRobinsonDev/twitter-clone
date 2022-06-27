import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import { setError } from "../../app/features/errorSlice";
import { useAppDispatch, useAppSelector } from "../../util/hooks";
import { User } from "../../util/types";

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const loggedUser = useAppSelector(state => state.user.user);
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

    return <>
    <div>
      <Link to="/home">Back</Link>
      <p>{user?.username}</p>
      <p>{user?.num_tweets}</p>
    </div>
    <img src={user?.banner_photo} alt="Banner" />
    <section>
      <img src={user?.profile_photo} alt="Profile" />
        {loggedUser?.id === parseInt(userId ? userId : "")
          ? <button>Edit Profile</button>
          : ""
        }
      <p>{user?.bio}</p>
      <p>Joined {user?.date_acc_created}</p>
      <div>
        <small>{user?.num_following} Following</small>
        <small>{user?.num_followers} Followers</small>
      </div>
    </section>
  </>
}

export default UserProfile;