import { createSlice } from "@reduxjs/toolkit";
import { Post_db } from "../../util/types";

type SliceState = {
  posts: Post_db[] | null,
  reposts: number[] | null,
  upvotes: number[] | null,
  downvotes: number[] | null,
  bookmarks: number[] | null
  
}
const initialState: SliceState =  {
  posts: null,
  reposts: null,
  upvotes: null,
  downvotes: null,
  bookmarks: null
}

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    updatePost: (state, { payload }) => {
      if (!state.posts) return;

      const index = state.posts.findIndex(post => post.id === payload.id); 
      state.posts[index] = payload.post;
    },
    setReposts: (state, { payload }) => {
      state.reposts = payload;
    },
    setUpvotes: (state, { payload }) => {
      state.upvotes = payload;
    },
    setDownvotes: (state, { payload }) => {
      state.downvotes = payload;
    },
    setBookmarks: (state, { payload }) => {
      state.bookmarks = payload;
    },
  }
});

export const { setPosts, updatePost, setBookmarks, setDownvotes, setReposts, setUpvotes } = postSlice.actions;
export const postReducer = postSlice.reducer;