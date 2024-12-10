import axios from 'axios';
const API_URL = 'https://api.example.com/documents'; 
const documentService = {
  // Fetch Devises from JSON file
  fetchDevises: async () => {
    try {
      const response = await axios.get('/mocks/devises.json');  
      return response.data;
    } catch (error) {
      throw new Error('Error fetching devises');
    }
  },

  // Fetch Accounts from JSON file
  fetchAccounts: async () => {
    try {
      const response = await axios.get('/mocks/comptes.json'); 
      return response.data;
    } catch (error) {
      throw new Error('Error fetching accounts');
    }
  },
  
  // Fetch Accounts from JSON file
  submitDocumentForm: async (formData) => {
    try {
     // const response = await axios.post(API_URL, formData);
     console.log(formData);
     const response = await axios.get('/mocks/documents.json'); 
     return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
};

export default documentService;
