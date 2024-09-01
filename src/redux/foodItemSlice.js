import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { name: "", calories: "", protein: "", fat: "", carbs: "" },
};

export const foodItemSlice = createSlice({
  name: "foodItem",
  initialState,
  reducers: {
    setFoodItem: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFoodItem } = foodItemSlice.actions;

export default foodItemSlice.reducer;
