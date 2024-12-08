import { fetchAccounts, fetchDevises } from '../redux/Slices/documentSlice';
import { store } from "../redux/Store"; // Redux store to pass to the resolver


// Resolver to fetch products
export const documentResolver = async () => {
  const dispatch = store.dispatch; // Access dispatch from the store
  try {
    await dispatch(fetchDevises()); // Dispatch the fetchProducts action
    await dispatch(fetchAccounts()); // Dispatch the fetchProducts action
    return null; // Return null to indicate no issues
  } catch (error) {
    console.error('Error fetching document filter:', error);
    throw error; // Throw the error to handle it in the route
  }
};
