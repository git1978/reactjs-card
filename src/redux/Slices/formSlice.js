import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import documentService from '../../services/documentsService';

// Initial state
const initialState = {
  formData: null,      // Stores the submitted form data
  documents: [],           // Stores the API response items
  loading: false,      // Loading state
  error: null,         // Error state
  success: false,      // Success state
};

// Async thunk for form submission
export const submitFormService = createAsyncThunk(
  'documents/submitFormService',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await documentService.submitDocumentForm(formData);
      return response; // Return the full response (e.g., items)
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

// Slice definition
const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    resetState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFormService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitFormService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.documents = action.payload.documents_rech.data; // Save items from the API response
        state.formData = action.meta.arg;        // Save the submitted form data
      })
      .addCase(submitFormService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
        state.success = false;
      });
  },
});
// Export actions and reducer
export const { resetState } = documentSlice.actions;
export default documentSlice.reducer;
