import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; 


export const addToCart = async (product) => {
  const response = await axios.post(`${API_BASE_URL}/cart/add`, {
    productId: product.id,
    name: `${product.company} ${product.model}`,
    price: product.price,
    image: product.image,
    quantity: 1
  });
  return response.data;
};


export const getCart = async () => {
  const response = await axios.get(`${API_BASE_URL}/cart`);
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await axios.put(`${API_BASE_URL}/cart/update`, {
    productId,
    quantity
  });
  return response.data;
};


export const removeFromCart = async (productId) => {
  const response = await axios.delete(`${API_BASE_URL}/cart/remove/${productId}`);
  return response.data;
};


export const clearCart = async () => {
  const response = await axios.delete(`${API_BASE_URL}/cart/clear`);
  return response.data;
};
