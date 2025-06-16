// import { jwtStorage } from "./jwt_storage";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'https://webfmsi.singapoly.com';

// Helper function untuk handle response
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  
  return await response.text();
};

// GET request
export const getData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};

// POST request dengan FormData
export const sendData = async (endpoint, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData, // FormData langsung tanpa headers Content-Type
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
};

// DELETE request
export const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('DELETE request error:', error);
    throw error;
  }
};

// PUT request dengan FormData (jika diperlukan)
export const updateData = async (endpoint, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      body: formData,
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('PUT request error:', error);
    throw error;
  }
};

// POST request dengan JSON
export const sendJSON = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('POST JSON request error:', error);
    throw error;
  }
};

export const getDataPublic = (url) => {
  return fetch(url)
    .then((response) =>
      response.status >= 200 &&
      response.status <= 299 &&
      response.status !== 204
        ? response.json()
        : response,
    )
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};

// export const getDataPrivate = async (url) => {
//   let token = await jwtStorage.retrieveToken();
//   return fetch(API_BASE_URL + url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) =>
//       response.status >= 200 &&
//       response.status <= 299 &&
//       response.status !== 204
//         ? response.json()
//         : response,
//     )
//     .then((data) => {
//       return data;
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

// export const sendDataPrivate = async (url, data) => {
//   //401 -> jwt expired, flow process to login
//   //400 -> jwt malformed
//   //204 -> No Content, but success
//   //NOTE : You must special handle for HTTP status above

//   let token = await jwtStorage.retrieveToken();
//   const options = {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   // Add body only if data exists
//   if (data) {
//     options.body = data;
//   }
//   console.log(options);

//   return fetch(API_BASE_URL + url, options)
//     .then((response) =>
//       response.status === 401
//         ? { isExpiredJWT: true }
//         : response.status >= 200 &&
//             response.status <= 299 &&
//             response.status !== 204
//           ? response.json()
//           : response,
//     )
//     .then((data) => data)
//     .catch((err) => console.log(err));
// };

// export const editDataPrivatePut = async (url, data) => {
//   //401 -> jwt expired, flow process to login
//   //400 -> jwt malformed
//   //204 -> No Content, but success
//   //NOTE : You must special handle for HTTP status above
//   let token = await jwtStorage.retrieveToken();
//   return fetch(API_BASE_URL + url, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) =>
//       response.status === 401
//         ? { isExpiredJWT: true }
//         : response.status >= 200 &&
//             response.status <= 299 &&
//             response.status !== 204
//           ? response.json()
//           : response,
//     )
//     .then((data) => data)
//     .catch((err) => console.log(err));
// };

// export const editDataPrivateURLEncoded = async (url, data) => {
//   //401 -> jwt expired, flow process to login
//   //400 -> jwt malformed
//   //204 -> No Content, but success
//   //NOTE : You must special handle for HTTP status above
//   // var token = localStorage.getItem("token_auth");
//   let token = await jwtStorage.retrieveToken();
//   return fetch(API_BASE_URL + url, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//     },
//     body: data,
//   })
//     .then((response) =>
//       response.status === 401
//         ? { isExpiredJWT: true }
//         : response.status >= 200 &&
//             response.status <= 299 &&
//             response.status !== 204
//           ? response.json()
//           : response,
//     )
//     .then((data) => data)
//     .catch((err) => console.log(err));
// };

// export const deleteDataPrivateURLEncoded = async (url, data) => {
//   //401 -> jwt expired, flow process to login
//   //400 -> jwt malformed
//   //204 -> No Content, but success
//   //NOTE : You must special handle for HTTP status above
//   // var token = localStorage.getItem("token_auth");
//   let token = await jwtStorage.retrieveToken();
//   return fetch(API_BASE_URL + url, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//     },
//     body: data,
//   })
//     .then((response) =>
//       response.status === 401
//         ? { isExpiredJWT: true }
//         : response.status >= 200 &&
//             response.status <= 299 &&
//             response.status !== 204
//           ? response.json()
//           : response,
//     )
//     .then((data) => data)
//     .catch((err) => console.log(err));
// };

// export const deleteDataPrivateJSON = async (url, data) => {
//   //401 -> jwt expired, flow process to login
//   //400 -> jwt malformed
//   //204 -> No Content, but success
//   //NOTE : You must special handle for HTTP status above
//   // var token = localStorage.getItem("token_auth");
//   let token = await jwtStorage.retrieveToken();
//   return fetch(API_BASE_URL + url, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: data,
//   })
//     .then((response) =>
//       response.status === 401
//         ? { isExpiredJWT: true }
//         : response.status >= 200 &&
//             response.status <= 299 &&
//             response.status !== 204
//           ? response.json()
//           : response,
//     )
//     .then((data) => data)
//     .catch((err) => console.log(err));
// };

// export const logoutAPI = async () => {
//   let token = await jwtStorage.retrieveToken();
//   let formData = new FormData();
//   formData.append("logout", "Logout"); // Assuming jwtStorage retrieves token
//   return fetch(API_BASE_URL + "/api/auth/logout", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   })
//     .then((response) => {
//       if (response.status === 200) {
//         jwtStorage.removeItem();
//         return { isLoggedOut: true };
//       } else {
//         // Handle errors (e.g., unexpected status code)
//         console.error("Logout failed:", response.statusText);
//         return false;
//       }
//     })
//     .catch((error) => {
//       console.error("Logout error:", error);
//       return false;
//     });
// };

export const getImage = (url_image) => {
  const imgDefault = "/storage/images/userpng_1717846018.png";
  let imgResult = url_image ? url_image : imgDefault;
  return API_BASE_URL + imgResult;
};
