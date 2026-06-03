
// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

// Layouts & Protection
import AdminLayout from './layouts/AdminLayout' 
import ProtectedRoute from './components/auth/ProtectedRoute' 

// Pages
// import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup' 
import Categories from './pages/Categories'         
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound' 


export default function App() {
    return (
        <ChakraProvider value={defaultSystem}>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />   

                    {/* Private Admin Routes (ProtectedRoute) */}
                    <Route element = {
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }>
                        <Route path="/" element={<Navigate to="/admin" replace />} />
                        <Route path="/admin" element={<Dashboard />} />
                        <Route path="/admin/categories" element={<Categories />} />
                    </Route>

                    {/* Catch-all 404 Page */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </ChakraProvider>
    )
}