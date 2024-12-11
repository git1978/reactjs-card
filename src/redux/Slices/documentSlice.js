import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import documentService from "../../services/documentsService"; // Assuming your documentService is in the same directory

// Async thunks for fetching devises and accounts
export const fetchDevises = createAsyncThunk(
  "documents/fetchDevises",
  async () => {
    const response = await documentService.fetchDevises();
    return response;
  }
);

export const fetchAccounts = createAsyncThunk(
  "documents/fetchAccounts",
  async () => {
    const response = await documentService.fetchAccounts();
    return response;
  }
);

export const fetchDocumentTypes = createAsyncThunk(
  "documentTypes/fetchDocumentTypes",
  async () => {
    const response = await documentService.fetchDocumentTypes();
    return response;
  }
);

// Slice to manage document state
const documentSlice = createSlice({
  name: "documents",
  initialState: {
    devises: [],
    accounts: [],
    documentTypes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevises.fulfilled, (state, action) => {
        state.loading = false;
        state.devises = action.payload;
      })
      .addCase(fetchDevises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDocumentTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocumentTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.documentTypes = action.payload;
      })
      .addCase(fetchDocumentTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
// Export the reducer
export default documentSlice.reducer;
