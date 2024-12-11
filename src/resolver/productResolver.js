import { fetchProducts } from "../redux/Slices/productSlice";
import { store } from "../redux/Store"; // Redux store to pass to the resolver

// Resolver to fetch products
export const productResolver = async () => {
  const dispatch = store.dispatch; // Access dispatch from the store
  await dispatch(fetchProducts()); // Dispatch the fetchProducts action
  return null; // Return null to indicate no issues
};
