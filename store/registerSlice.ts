import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RegisterState} from "../types/registerState"

const initialState: RegisterState = {
  username: "",
  phone: "",
  email: "",
  password: "",
  role: "user",
};

const registerSlice= createSlice({
  name: 'register',
  initialState,
  reducers: {
    setRegisterData(state, action: PayloadAction<RegisterState>) {
        return { ...state, ...action.payload};
    },
    clearRegisterData() {
        return initialState;
    },
  },
});

export const { setRegisterData, clearRegisterData} = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
