// src/redux/slices/formSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  documentType: '',
  dateRange: [new Date(), new Date()],
  account: '',
  period: '',
  currency: '',
  loading: false,
  error: null,
  success: false,
};

// Async thunk for form submission
export const submitFormService = createAsyncThunk(
  'form/submitFormService',
  async (formData, { rejectWithValue }) => {
    try {
      // Assuming you have an API to handle the form submission
      const response = await axios.post('YOUR_API_URL', formData);
      return response.data; // Return the data on success
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Create slice
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setDocumentType(state, action) {
      state.documentType = action.payload;
    },
    setDateRange(state, action) {
      state.dateRange = action.payload;
    },
    setAccount(state, action) {
      state.account = action.payload;
    },
    setPeriod(state, action) {
      state.period = action.payload;
    },
    setCurrency(state, action) {
      state.currency = action.payload;
    },
    resetForm(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFormService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitFormService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Handle the response data if needed
      })
      .addCase(submitFormService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred during submission';
      });
  },
});

export const { setDocumentType, setDateRange, setAccount, setPeriod, setCurrency, resetForm } = formSlice.actions;

export default formSlice.reducer;
