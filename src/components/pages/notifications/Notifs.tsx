import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "../../../util/types";

import { BiMessageSquareDetail } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';

const Notifs: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("../login");
  }, [user, navigate])
  return <section>
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