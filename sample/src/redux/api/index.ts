import axios from "axios";
//
// import { store } from "@/redux/app/store.ts";
// import { logout } from "@/redux/features/auth/slice.auth.ts";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  withXSRFToken: true
});

// Request interceptor
API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`

  return config;

  // old 
  // const url = config.url || '';
  
  // // Skip token check for auth routes
  // if (url.includes('/auth/')) {
  //   return config;
  // }

  // // Check if request is for protected endpoints (subscription, user, etc.)
  // const protectedEndpoints = ['/user', '/subscription', '/profile'];
  // const isProtectedEndpoint = protectedEndpoints.some(endpoint => url.includes(endpoint));

  // if (isProtectedEndpoint) {
  //   // const cookies = document.cookie.split(';');
  //   // const tokenCookie = cookies.find(c => c.trim().startsWith('accessToken='));
  //   const token = localStorage.getItem('accessToken');

  //   // if (tokenCookie) {
  //   //   const token = tokenCookie.split('=')[1];
  //   //   if (token) {
  //   //     const decodedToken = decodeURIComponent(token.trim());
  //   //     config.headers.Authorization = `Bearer ${decodedToken}`;
  //   //     console.log('Protected route detected, adding token for:', url);
  //   //   }
  //   // } else 
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   } else {
  //     console.warn('No access token found for protected route:', url);
  //   }
  // }

  // return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await API.post('/auth/refreshtoken', {refreshToken: localStorage.getItem('refreshToken')}, { withCredentials: true });

        const { accessToken, refreshToken} = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        // // Token will be set in cookie by server
        return API(originalRequest);
      } catch (refreshError) {
        window.location.href = '/session/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
