import { Link } from "react-router-dom";
import Axios from "axios";
import React, {useState} from "react";

const Register = () => {
  const [username, setUsername] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  const [confirmPassword, setConfirmPassword] = useState<null | string>(null);

  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        username,
        password,
        confirmPassword
      },
      withCredentials: true,
      url: "http://localhost:4001/register"
    }).then((res) => console.log(res))
  }
  return <section>
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} autoFocus required />
      <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <input type="password" name="confirm-password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />
      <input type="submit" value="Register" />
    </form>
    <div>
      <p>Already have an account?</p>
      <Link to="/login">Log In</Link>
    </div>
  </section>
}

export default Register;