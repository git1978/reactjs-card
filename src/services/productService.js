export const fetchProductsFromService = async () => {
  const response = await fetch('../mocks/products.json');  // Path to the JSON file
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};
