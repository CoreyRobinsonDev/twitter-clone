import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/userSlice";
import { errorReducer } from "./features/errorSlice";
import { postReducer } from "./features/postSlice";
import { commentReducer } from "./features/commentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    posts: postReducer,
    comments: commentReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;