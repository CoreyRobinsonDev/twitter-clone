import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../util/types";


type SliceState = {
  user: User | null,
}
const initialState: SliceState =  {
  user: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    }
  }
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;