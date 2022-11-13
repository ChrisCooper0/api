import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
  apiKeyState: string;
}

// Initial state
const initialState: AuthState = {
  apiKeyState: "",
};

// Actual Slice
export const apiKeySlice = createSlice({
  name: "apiKey",
  initialState,
  reducers: {
    // Action to set the authentication status
    setApiKeyState(state, action) {
      state.apiKeyState = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.apiKeyState,
      };
    },
  },
});

export const { setApiKeyState } = apiKeySlice.actions;

export const selectApiKeyState = (state: AppState) => state.apiKey.apiKeyState;

export default apiKeySlice.reducer;
