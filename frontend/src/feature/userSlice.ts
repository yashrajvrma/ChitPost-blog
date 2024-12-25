import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: "",
    lastName: "",
    profileColor: "",
  },
  reducers: {
    setUser: (state, action) => {
      const { firstName, lastName, profileColor } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.profileColor = profileColor;
    },
    removeUser: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.profileColor = "";
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
