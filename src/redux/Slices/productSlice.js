// src/features/products/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsFromService } from '../../services/productService';  // Import the service

// Async thunk to fetch products using the service
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const products = await fetchProductsFromService();  // Call the service
  return products;  // Return the fetched products
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,  // Indicates if the data is being loaded
    loaded: false,   // Indicates if the data has been loaded successfully
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;  // Set loading to true when the fetch starts
        state.loaded = false;  // Set loaded to false when loading starts
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when fetch is complete
        state.loaded = true;   // Set loaded to true when data is successfully fetched
        state.items = action.payload; // Store fetched products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false; // Set loading to false when fetch fails
        state.loaded = false;  // Set loaded to false when data fetch fails
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
