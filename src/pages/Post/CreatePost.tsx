import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

import { useAppDispatch, useAppSelector } from "../../util/hooks";
import { setError } from "../../app/features/errorSlice";

const CreatePost = () => {
  const user = useAppSelector(state => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const [file, setFile] = useState<string | Blob>("");


  const handleSubmit = () => {
    // A unary operator like plus triggers the valueOf method in the Date object
    // and it returns the timestamp (without any alteration).
    const date = Math.floor(+ new Date() / 1000).toString();
    const posterId = user ? user?.id.toString() : "";

    const data = new FormData();
    data.append("text", text);
    data.append("date", date);
    data.append("poster_id", posterId);
    data.append("file", file);

    Axios({
      method: "POST",
      withCredentials: true,
      data,
      url: "http://localhost:4001/post"
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
        <input type="submit" value="Post" />
      </div>
    </form>
  </div>
}

export default CreatePost;