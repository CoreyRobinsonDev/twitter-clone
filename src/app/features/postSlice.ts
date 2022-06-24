import { createSlice } from "@reduxjs/toolkit";
import { Post_db } from "../../util/types";

type SliceState = {
  posts: Post_db[] | null,
}
const initialState: SliceState =  {
  posts: null
}

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    addUpvote: (state, { payload }) => {
      if (state.posts?.[payload]) {
        state.posts[payload].num_upvotes++
      }
    },
    removeUpvote: (state, { payload }) => {
      if (state.posts?.[payload]) {
        state.posts[payload].num_upvotes--
      }
    },
    addDownvote: (state, { payload }) => {
      if (state.posts?.[payload]) {
        state.posts[payload].num_downvotes++
      }
    },
    removeDownvote: (state, { payload }) => {
      if (state.posts?.[payload]) {
        state.posts[payload].num_downvotes--
      }
    },
    addRepost: (state, { payload }) => {
      if (state.posts?.[payload]) {
        state.posts[payload].num_reposts++
      }
    },
    removeRepost: (state, { payload }) => {
      if (state.posts?.[payload]) {
        state.posts[payload].num_reposts--
      }
    },
  }
});

export const {
  setPosts,
  addDownvote,
  addRepost,
  addUpvote,
  removeRepost,
  removeDownvote,
  removeUpvote } = postSlice.actions;
export const postReducer = postSlice.reducer;