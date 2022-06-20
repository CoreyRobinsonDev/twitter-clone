
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../util/hooks";
const Bookmarks = () => {
  const user = useAppSelector(state => state.user.user);
  return <section>
    {!user && <Navigate to="/login" />}
  </section>
}

export default Bookmarks;