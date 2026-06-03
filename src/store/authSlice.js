
import { createSlice } from '@reduxjs/toolkit';

// Checking localStorage for existing data so the login session persists on page refresh
const savedToken = localStorage.getItem('token');
const savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
  user: savedUser,                       // User profile information
  token: savedToken,                     // JWT security token
  isAuthenticated: !!savedToken,         // True if token exists, false otherwise
  loading: false,                        // For showing loading spinners during API calls
  error: null                            // For displaying error messages if login fails
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 1. When the login process starts
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // 2. When login is successful (Data is saved to the store and browser memory)
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;

      // Persisting login session even if the browser is closed
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    
    // 3. When login fails
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload; // Error message from the backend (e.g., incorrect email/password)
    },
    
    // 4. When logging out (Clears all data in one click)
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;

      // Clearing local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});

// Exporting actions so they can be dispatched from the LoginForm or Logout button
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Exporting the reducer to connect it to the central store
export default authSlice.reducer;