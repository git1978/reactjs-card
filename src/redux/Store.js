import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/cartSlice"; // Path to your cart slice
import productReducer from './Slices/productSlice'; // Path to your product slice
import documentReducer from './Slices/documentSlice'; // Path to your product slice
import formReducer from './Slices/formSlice'; // Import the formSlice

export const store = configureStore({
  reducer: {
    cart: cartReducer,       // Manages the cart state
    products: productReducer,// Manages the products state
    documents: documentReducer,
    form: formReducer,
  },
});

export default store;
