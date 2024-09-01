import { configureStore } from "@reduxjs/toolkit";
import foodItemReducer from "./foodItemSlice";
import foodItemsReducer from "./foodItemsSlice";

export const store = configureStore({
  reducer: { foodItem: foodItemReducer, foodItems: foodItemsReducer },
});
