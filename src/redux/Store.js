import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/cartSlice"; // Path to your cart slice
import productReducer from './Slices/productSlice'; // Path to your product slice

export const store = configureStore({
  reducer: {
    cart: cartReducer,       // Manages the cart state
    products: productReducer // Manages the products state
  },
});

export default store;
