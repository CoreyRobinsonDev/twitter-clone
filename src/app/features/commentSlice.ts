import { createSlice } from "@reduxjs/toolkit";
import { Comment } from "../../util/types";

type SliceState = {
  comments: Comment[] | null,
}
const initialState: SliceState =  {
  comments: null
}

const commentSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setComments: (state, { payload }) => {
      state.comments = payload;
    }
  }
});

export const { setComments } = commentSlice.actions;
export const commentReducer = commentSlice.reducer;