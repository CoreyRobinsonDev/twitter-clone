import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "../../../util/types";

const Explore: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("../login");
  }, [user, navigate])
  return <section>
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