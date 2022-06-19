import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "../../../util/types";

const Bookmarks: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("../login");
  }, [user, navigate])
  return <section>
    
  </section>
}

export default Bookmarks;