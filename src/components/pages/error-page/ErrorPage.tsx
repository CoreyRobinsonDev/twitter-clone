import { useNavigate } from "react-router-dom"

export default function ErrorPage() {
  const navigate = useNavigate();
  return <div>
    <h1>Page not found</h1>
    <button onClick={() => navigate("/")}>Return to Home</button>
  </div>
}