import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "../../../util/types";

const Profile: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("../login");
  }, [user, navigate])
  return <>Profile</>
}
export default Profile;