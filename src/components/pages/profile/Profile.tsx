
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../util/hooks";
const Profile = () => {
  const user = useAppSelector(state => state.user.user); 

  return <>
  {!user && <Navigate to="/login" />}
    Profile
  </>
}
export default Profile;