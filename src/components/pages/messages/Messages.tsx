import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../util/hooks";

const Messages = () => {
  const user = useAppSelector(state => state.user.user); 

  return <section>
  {!user && <Navigate to="/login" />}
    <div>
      <input />
      <ul>
        <li>
          <button>
            <img src="https://source.unsplash.com/random" alt="profile" />
            <span>Mary</span>
            <span>@Mary</span>
          </button>
        </li>
        <li>
          <button>
            <img src="https://source.unsplash.com/random" alt="profile" />
            <span>Bill</span>
            <span>@Bill</span>
          </button>
        </li>
      </ul>
    </div>
    <div>
      
    </div>
  </section>
}
export default Messages;