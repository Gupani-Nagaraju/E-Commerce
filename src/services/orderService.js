import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";


export const createOrder = async (orderData) => {
  const response = await axios.post(`${API_BASE_URL}/orders/create`, {
    items: orderData.items,
    totalAmount: orderData.totalAmount,
    shippingAddress: orderData.shippingAddress,
    paymentMethod: orderData.paymentMethod
  });
  return response.data;
};


export const initiatePayment = async (orderId, amount) => {
  const response = await axios.post(`${API_BASE_URL}/payment/initiate`, {
    orderId,
    amount
  });
  return response.data;
};


export const verifyPayment = async (paymentData) => {
  const response = await axios.post(`${API_BASE_URL}/payment/verify`, paymentData);
  return response.data;
};


export const getOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/orders`);
  return response.data;
};
