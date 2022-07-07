import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../util/types";


type SliceState = {
  user: User | null,
  followers: number[] | null,
  following: number[] | null
}
const initialState: SliceState =  {
  user: null,
  followers: null,
  following: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setFollowers: (state, { payload }) => {
      state.followers = payload;
    },
    setFollowing: (state, { payload }) => {
      state.following = payload;
    }
  }
});

export const { setUser, setFollowing, setFollowers } = userSlice.actions;
export const userReducer = userSlice.reducer;