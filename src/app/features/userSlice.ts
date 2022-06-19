import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    }
  }
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;