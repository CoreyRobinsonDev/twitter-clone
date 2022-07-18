import { Link, useNavigate, Navigate } from "react-router-dom";
import Axios from "axios";
import React, {useState} from "react";
import { useAppSelector } from "../util/hooks";

const Register = () => {
  const [username, setUsername] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  const [confirmPassword, setConfirmPassword] = useState<null | string>(null);
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user.user);

  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        username,
        password,
        confirmPassword
      },
      url: "/register"
    }).then((res) => navigate("/"))
      .catch((err) => {
      setAlert(err.response.data);
    })
  }
  return <section>
    {user && <Navigate to="/home" />}
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} autoFocus required />
      <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <input type="password" name="confirm-password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />
      <input type="submit" value="Register" />
    </form>
    <span>{alert}</span>
    <div>
      <p>Already have an account?</p>
      <Link to="/">Log In</Link>
    </div>
  </section>
}

export default Register;