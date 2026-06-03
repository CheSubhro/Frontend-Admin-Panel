

// src/pages/Signup.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Center, Box, Flex, Heading, Text, VStack, Stack, Link } from '@chakra-ui/react';
import SignupForm from '../features/Auth/SignupForm';

const Signup = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <Center minH="100vh" w="100vw" bg="#f0f2f5" p={{ base: "0", sm: "4" }}>    
            <Flex 
                w="100%" 
                maxW="1050px" 
                minH="680px" 
                bg="white" 
                borderRadius={{ base: "0px", sm: "24px" }} 
                boxShadow="0px 30px 60px rgba(0, 0, 0, 0.08)"
                overflow="hidden"
                direction={{ base: "column", md: "row" }}
            >
                <Flex 
                    w="45%" 
                    bgGradient="to-br"
                    gradientFrom="#0f172a" 
                    gradientTo="#1e3a8a"   
                    p="12"
                    direction="column"
                    justify="center"
                    position="relative"
                    display={{ base: "none", md: "flex" }}
                >
                    <Box position="absolute" top="-10%" left="-10%" w="300px" h="300px" bg="blue.500" opacity="0.15" filter="blur(60px)" borderRadius="full" />

                    <VStack spaceY="5" align="stretch" position="relative" zIndex="2">
                        <Heading size="3xl" fontWeight="extrabold" color="white" lineHeight="1.1" letterSpacing="tight">
                            Join the Elite <br />
                            <Text as="span" color="blue.400">Creators.</Text>
                        </Heading>
                        <Text color="slate.300" fontSize="md" lineHeight="relaxed" opacity="0.8">
                            Create your administrator account to start writing, managing, and scaling your blog ecosystem like a pro.
                        </Text>
                    </VStack>
                    
                    <Box mt="12" alignSelf="center" position="relative" zIndex="2">
                        <img 
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
                            alt="Workspace"
                            style={{ width: '100%', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
                        />
                    </Box>
                </Flex>

                <Center w={{ base: "100%", md: "55%" }} p={{ base: "6", md: "16" }}>
                    <Box w="100%" maxW="400px" bg="white">
                        <VStack spaceY="6" align="stretch">
                            
                            <Stack spaceY="2" align="stretch">
                                <Text fontSize="xs" fontWeight="bold" color="blue.600" letterSpacing="widest" textTransform="uppercase">🚀 Get Started</Text>
                                <Heading size="2xl" fontWeight="bold" color="slate.900" letterSpacing="tight">Create Administrator Account</Heading>
                            </Stack>

                            <SignupForm />

                            <Text fontSize="xs" color="gray.500" textAlign="center">
                                Already have an admin account?{' '}
                                <Link as={RouterLink} to="/login" color="blue.600" fontWeight="semibold" _hover={{ textDecoration: "underline" }}>
                                    Sign In
                                </Link>
                            </Text>
                        </VStack>
                    </Box>
                </Center>
            </Flex>
        </Center>
    );
};

export default Signup;