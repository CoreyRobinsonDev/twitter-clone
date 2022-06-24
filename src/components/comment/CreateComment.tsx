import { useNavigate, useParams } from "react-router-dom";
import {useState} from "react";
import Axios from "axios";

import { useAppDispatch, useAppSelector } from "../../util/hooks";
import { setError } from "../../app/features/errorSlice";

const CreateComment = () => {
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [text, setText] = useState("");
  const [file, setFile] = useState<string | Blob>("");


  const handleSubmit = () => {
    const posterId = user ? user?.id.toString() : "";

    const data = new FormData();
    data.append("text", text);
    data.append("poster_id", posterId);
    if (typeof postId === "string") data.append("post_id", postId);
    data.append("file", file);

    Axios({
      method: "POST",
      withCredentials: true,
      data,
      url: "http://localhost:4001/comment"
    })
      .catch((err) => {
        dispatch(setError(err.response.data));
        navigate("*");
    })
  }

  return <div>
    <img src={user?.profile_photo} alt="" />
    <form onSubmit={handleSubmit}>
      <textarea onChange={(e) => setText(e.target.value)} value={text} />
      <div>
        <input type="file" accept="image/jpeg, image/png, image/webp, image/gif, video/mp4" onChange={(e) => setFile(e.target.files ? e.target.files[0]: "") }/>
        <input type="submit" value="Reply" />
      </div>
    </form>
  </div>
}

export default CreateComment;