import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: true,
    movieName: [],
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state, actions) => {
      state.isMenuOpen = actions.payload;
    },
    addMovieName: (state, action) => {
      state.movieName.push(action.payload);
    },
  },
});
export const { toggleMenu, closeMenu, addMovieName } = appSlice.actions;
export default appSlice.reducer;
