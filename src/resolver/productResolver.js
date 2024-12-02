import { fetchProducts } from '../redux/Slices/productSlice';
import { store } from "../redux/Store"; // Redux store to pass to the resolver


// Resolver to fetch products
export const productResolver = async () => {
  const dispatch = store.dispatch; // Access dispatch from the store
  try {
    await dispatch(fetchProducts()); // Dispatch the fetchProducts action
    return null; // Return null to indicate no issues
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Throw the error to handle it in the route
  }
};
