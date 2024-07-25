import { createSlice } from "@reduxjs/toolkit";
import { updateLocation } from "./actions";

type State = {
  location: number | null;
};

const initialState: State = {
  location: null,
};

const { reducer, actions, name } = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateLocation, (state, action) => {
      state.location = action.payload;
    });
  },
});

export { reducer, name, actions };
