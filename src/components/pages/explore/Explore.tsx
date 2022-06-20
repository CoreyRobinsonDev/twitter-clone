import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../util/hooks";

const Explore = () => {
  const user = useAppSelector(state => state.user.user);

  return <section>
    {!user && <Navigate to="/login" />}
    <input />
    <ul>
      <li><button>For You</button></li>
      <li><button>Trending</button></li>
      <li><button>News</button></li>
      <li><button>Sports</button></li>
      <li><button>Entertainment</button></li>
    </ul>
    <div>
    {/* posts containing a hashtag relavent to the button */}
    </div>
  </section>
}
export default Explore;