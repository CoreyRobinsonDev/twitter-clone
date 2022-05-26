import { BiMessageSquareDetail } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';

export default function Notifs() {
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