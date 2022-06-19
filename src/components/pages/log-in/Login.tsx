import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import React, {useState} from "react";

const Login = () => {
  const [username, setUsername] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  const navigate = useNavigate();

  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        username,
        password
      },
      withCredentials: true,
      url: "http://localhost:4001/login"
    }).then((res) => navigate("../"))
    .catch((err) => navigate("*"))
  }

  return <section>
    <form onSubmit={(e) => handleSubmit(e)} >
      <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} autoFocus required />
      <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <input type="submit" value="Log In" />
    </form>
    <div>
      <p>Don't have an account?</p>
      <Link to="/register">Register</Link>
    </div>
  </section>
}

export default Login;