import { createAction } from "@reduxjs/toolkit";
import { name } from "./slice";

const updateLocation = createAction<number>(`${name}/update`, (payload) => {
  return payload;
});

export { updateLocation };
