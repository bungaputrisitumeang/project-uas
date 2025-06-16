// src/utils/api.js

// Function to handle GET requests
export const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();  // Assuming the response is in JSON format
    return data;  // Return the data received from the API
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;  // Throw the error if the fetch fails
  }
};

// Function to handle POST/PUT requests for sending data
export const sendData = async (url, formData) => {
  try {
    const response = await fetch(url, {
      method: formData ? 'POST' : 'PUT',  // Use POST or PUT based on the data
      body: formData, // Send the FormData as the body of the request
    });

    const data = await response.json();
    return data;  // Return the response data
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;  // Throw the error if the fetch fails
  }
};

// Function to handle DELETE requests
export const deleteData = async (url, params) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      body: params,  // Send parameters for deletion, if required
    });
    const data = await response.json();  // Assume the response is in JSON format
    return data;  // Return the response data
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;  // Throw the error if the fetch fails
  }
};
