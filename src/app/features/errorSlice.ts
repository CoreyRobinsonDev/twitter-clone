import { createSlice } from "@reduxjs/toolkit";

type SliceState = {
  errMessage: string
}

const initialState: SliceState = {
  errMessage: "Page Not Found"
}

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.errMessage = payload;
    }
  }
})

export const { setError } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;