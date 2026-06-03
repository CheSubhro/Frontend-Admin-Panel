

// src/pages/ForgotPassword.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Center, Box, Flex, Heading, Text, VStack, Stack, Link } from '@chakra-ui/react';
import ForgotPasswordForm from '../features/Auth/ForgotPasswordForm';

const ForgotPassword = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // Reverse protection: Redirects logged-in admins away from the recovery page straight to dashboard
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        // Professional soft-gray metallic background covering the full viewport
        <Center minH="100vh" w="100vw" bg="#f0f2f5" p={{ base: "0", sm: "4" }}>    
            {/* Main Premium Container Card */}
            <Flex 
                w="100%" 
                maxW="1050px" 
                minH="650px" 
                bg="white" 
                borderRadius={{ base: "0px", sm: "24px" }} 
                boxShadow="0px 30px 60px rgba(0, 0, 0, 0.08)"
                overflow="hidden"
                direction={{ base: "column", md: "row" }}
            >
                {/* ⬅️ Left Side: Royal Dark-Gradient Panel (Hidden on mobile viewports) */}
                <Flex 
                    w="45%" 
                    bgGradient="to-br"
                    gradientFrom="#0f172a" // Slate 900 (Deep Luxury Dark)
                    gradientTo="#1e3a8a"   // Blue 900
                    p="12"
                    direction="column"
                    justify="center"
                    position="relative"
                    display={{ base: "none", md: "flex" }}
                >
                    {/* Abstract circle in the background to produce a subtle glow effect */}
                    <Box position="absolute" top="-10%" left="-10%" w="300px" h="300px" bg="blue.500" opacity="0.15" filter="blur(60px)" borderRadius="full" />

                    <VStack spaceY="5" align="stretch" position="relative" zIndex="2">
                        <Heading size="3xl" fontWeight="extrabold" color="white" lineHeight="1.1" letterSpacing="tight">
                            Recover Your <br />
                            <Text as="span" color="blue.400">Access.</Text>
                        </Heading>
                        <Text color="slate.300" fontSize="md" lineHeight="relaxed" opacity="0.8">
                            Don't worry, it happens. Provide your registered email address, and we will send you a secure link to reset your administrator credentials instantly.
                        </Text>
                    </VStack>
                    
                    {/* Premium 3D Minimalistic Security Artwork */}
                    <Box mt="12" alignSelf="center" position="relative" zIndex="2">
                        <img 
                            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop" 
                            alt="Security and Lock Artwork"
                            style={{ width: '100%', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
                        />
                    </Box>
                </Flex>

                {/* ➡️ Right Side: Crisp and Clean ForgotPasswordForm Section */}
                <Center w={{ base: "100%", md: "55%" }} p={{ base: "6", md: "16" }}>
                    <Box w="100%" maxW="400px" bg="white">
                        <VStack spaceY="6" align="stretch">
                            
                            <Stack spaceY="2" align="stretch">
                                <Text fontSize="xs" fontWeight="bold" color="blue.600" letterSpacing="widest" textTransform="uppercase">🔒 Account Security</Text>
                                <Heading size="2xl" fontWeight="bold" color="slate.900" letterSpacing="tight">Forgot Password?</Heading>
                                <Text color="gray.500" fontSize="sm">Enter your email to receive a password reset link</Text>
                            </Stack>

                            {/* Injecting the clean ForgotPasswordForm Component */}
                            <ForgotPasswordForm />

                            {/* Redirection Link to Login Page */}
                            <Text fontSize="xs" color="gray.500" textAlign="center">
                                Remember your password?{' '}
                                <Link as={RouterLink} to="/login" color="blue.600" fontWeight="semibold" _hover={{ textDecoration: "underline" }}>
                                    Back to Sign In
                                </Link>
                            </Text>
                        </VStack>
                    </Box>
                </Center>
            </Flex>
        </Center>
    );
};

export default ForgotPassword;