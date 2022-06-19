import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "../../../util/types";

const Messages: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("../login");
  }, [user, navigate])
  return <section>
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