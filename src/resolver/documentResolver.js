import {
  fetchAccounts,
  fetchDevises,
  fetchDocumentTypes,
} from "../redux/Slices/documentSlice";
import { store } from "../redux/Store"; // Redux store to pass to the resolver

// Resolver to fetch products
export const documentResolver = async () => {
  const dispatch = store.dispatch; // Access dispatch from the store
  await dispatch(fetchDevises()); // Dispatch the fetchProducts action
  await dispatch(fetchAccounts()); // Dispatch the fetchProducts action
  await dispatch(fetchDocumentTypes()); // Dispatch the fetchProducts action
  return null; // Return null to indicate no issues
};
