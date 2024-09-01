import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const foodItemsSlice = createSlice({
  name: "foodItem",
  initialState,
  reducers: {
    setFoodItems: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFoodItems } = foodItemsSlice.actions;

export default foodItemsSlice.reducer;
