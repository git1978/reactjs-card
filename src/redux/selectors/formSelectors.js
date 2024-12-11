export const selectFormState = (state) => state.form; // Whole form state
export const selectDocuments = (state) => state.form.documents; // Items from the response
export const selectLoading = (state) => state.form.loading; // Loading state
export const selectError = (state) => state.form.error; // Error state
export const selectSuccess = (state) => state.form.success; // Success state
