import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loderSlice";
import profileReducer from "./ProfileSlice";
import eventReducer from './eventSlice'
import notificationReducer from './notificationSlice'

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    profile: profileReducer,
    events: eventReducer,
    notification: notificationReducer,
  }
})

export default store;