import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../util/hooks";

import { BiMessageSquareDetail } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';

const Notifs = () => {
  const user = useAppSelector(state => state.user.user); 

  return <section>
  {!user && <Navigate to="/login" />}
    <div>
      <span><BsFillPersonFill></BsFillPersonFill></span>
      <img src="https://source.unsplash.com/random" alt="" />
      <p><b>Stella</b> followed you</p>
    </div>
    <div>
      <span><BiMessageSquareDetail></BiMessageSquareDetail></span>
      <img src="https://source.unsplash.com/random" alt="" />
      <p><b>Mary</b> messaged you</p>
    </div>
  </section>
}

export default Notifs;