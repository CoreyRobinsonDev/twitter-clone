
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../util/hooks";
const Settings = () => {
  const user = useAppSelector(state => state.user.user); 

  return <>
  {!user && <Navigate to="/login" />}
  </>
}
export default Settings;