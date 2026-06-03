
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 

const store = configureStore({
    reducer: {
        auth: authReducer, 
    
        // ভবিষ্যতে আপনার ব্লগের জন্য রিডিউসার লাগলে জাস্ট নিচে এভাবে যোগ করবেন:
        // blog: blogReducer
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// MAKE SURE THIS LINE SAYS 'export default'
export default store;