import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../util/hooks";
import { setUser } from "../app/features/userSlice";
import { setError } from "../app/features/errorSlice";

const Settings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Axios({
      method: "POST",
      withCredentials: true,
      url: "https://not-twitter-crd.herokuapp.com/logout"
    }).then((res) => {
      dispatch(setUser(null));
      navigate("/");
    }).catch((err) => {
      dispatch(setError(err.response.data));
      navigate("*");
    })
  }

  return <section>
    <ul>
      <li><button onClick={logout}>Log Out</button></li>
    </ul>
  </section>
}
export default Settings;