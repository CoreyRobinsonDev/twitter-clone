import { createSlice } from "@reduxjs/toolkit";
import { Post_db } from "../../util/types";

type SliceState = {
  posts: Post_db[] | null,
  
}
const initialState: SliceState =  {
  posts: null,

}

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    updatePost: (state, { payload }) => {
      if (state.posts) state.posts[payload.index] = payload.post;
    }
  }
});

export const { setPosts, updatePost } = postSlice.actions;
export const postReducer = postSlice.reducer;