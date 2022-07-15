import { Link, useNavigate, Navigate } from "react-router-dom";
import Axios from "axios";
import React, { useState } from "react";

import { setUser } from "../app/features/userSlice";
import { useAppDispatch, useAppSelector } from "../util/hooks";


const Login = () => {
  const [username, setUsername] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  const [alert, setAlert] = useState("");
  const user = useAppSelector(state => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        username,
        password
      },
      url: "http://localhost:4001/login"})
    .then((res) => {
      dispatch(setUser(res.data));
      navigate("/home");
    })
    .catch((err) => {
      setAlert("Incorrect Username/Password");  
    })
  }

  return <section>
    {user && <Navigate to="/home" />}
    <form onSubmit={(e) => handleSubmit(e)} >
      <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} autoFocus required />
      <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <input type="submit" value="Log In" />
    </form>
    <span>{ alert }</span>
    <div>
      <p>Don't have an account?</p>
      <Link to="/register">Register</Link>
    </div>
  </section>
}

export default Login;