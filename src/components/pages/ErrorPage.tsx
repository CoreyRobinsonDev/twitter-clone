import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../util/hooks";


export default function ErrorPage() {
  const navigate = useNavigate();
  const errorMessage = useAppSelector(state => state.error.errMessage);

  return <div>
    <h1>{errorMessage}</h1>
    <button onClick={() => navigate(-1)}>Go Back</button>
  </div>
}