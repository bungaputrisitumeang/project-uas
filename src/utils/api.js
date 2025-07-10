// src/utils/api.js

// Function to handle GET requests
export const getData = async (url) => {
  try {
    const API_BASE_URL = 'https://webfmsi.singapoly.com';
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    
    const response = await fetch(fullUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    if (!text) {
      return {};
    }
    
    try {
      return JSON.parse(text);
    } catch (e) {
      console.warn('Response bukan JSON valid:', text);
      return { message: text };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function to handle POST/PUT requests for sending data
export const sendData = async (url, formData) => {
  try {
    const API_BASE_URL = 'https://webfmsi.singapoly.com';
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    
    const response = await fetch(fullUrl, {
      method: 'POST', // Selalu gunakan POST untuk create
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
      return { success: true }; // Return default success untuk response kosong
    }
    
    try {
      return JSON.parse(text);
    } catch (e) {
      console.warn('Response bukan JSON valid:', text);
      return { message: text, success: true };
    }
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

// Function to handle DELETE requests
export const deleteData = async (url, params) => {
  try {
    const API_BASE_URL = 'https://webfmsi.singapoly.com';
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    
    console.log('DELETE request URL:', fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
      // Tidak perlu body untuk DELETE request berdasarkan Postman collection
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
      return { success: true }; // Return default success untuk response kosong
    }
    
    try {
      return JSON.parse(text);
    } catch (e) {
      console.warn('Response bukan JSON valid:', text);
      return { message: text, success: true };
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
