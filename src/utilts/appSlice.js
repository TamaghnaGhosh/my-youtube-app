import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state, actions) => {
      state.isMenuOpen = actions.payload;
    },
  },
});
export const { toggleMenu, closeMenu } = appSlice.actions;
export default appSlice.reducer;
