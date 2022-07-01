import { createSlice } from "@reduxjs/toolkit";
import { Comment } from "../../util/types";

type SliceState = {
  comments: Comment[] | null,
  reposts: number[] | null,
  upvotes: number[] | null,
  downvotes: number[] | null,
}
const initialState: SliceState =  {
  comments: null,
  reposts: null,
  upvotes: null,
  downvotes: null,
}

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, { payload }) => {
      state.comments = payload;
    },
    updateComment: (state, { payload }) => {
      if (!state.comments) return;

      const index = state.comments.findIndex(comment => comment.id === payload.id); 
      state.comments[index] = payload.comment;
    },
    setCommentsReposts: (state, { payload }) => {
      state.reposts = payload;
    },
    setCommentsUpvotes: (state, { payload }) => {
      state.upvotes = payload;
    },
    setCommentsDownvotes: (state, { payload }) => {
      state.downvotes = payload;
    },
  }
});

export const { setComments, updateComment, setCommentsDownvotes, setCommentsUpvotes, setCommentsReposts } = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
