"use client";

import { configureStore } from "@reduxjs/toolkit";

export extraArgument = {
  
}

export const store = configureStore({
  reducer: {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
