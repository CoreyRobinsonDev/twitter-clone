import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../../util/hooks";
import { setUser } from "../../../app/features/userSlice";

const Settings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:4001/logout"
    }).then((res) => {
      dispatch(setUser(null));
      navigate("/");
    })
  }

  return <section>
    <ul>
      <li><button onClick={logout}>Log Out</button></li>
    </ul>
  </section>
}
export default Settings;