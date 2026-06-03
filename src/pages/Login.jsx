

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Center, Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import LoginForm from '../features/Auth/LoginForm'; 

const Login = () => {
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
                minH="650px" 
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
                    <Box 
                        position="absolute" top="-10%" left="-10%" w="300px" h="300px" 
                        bg="blue.500" opacity="0.15" filter="blur(60px)" borderRadius="full" 
                    />

                    <VStack spaceY="5" align="stretch" position="relative" zIndex="2">
                        <Heading size="3xl" fontWeight="extrabold" color="white" lineHeight="1.1" letterSpacing="tight">
                            Control Your Content. <br />
                            <Text as="span" color="blue.400">Effortlessly.</Text>
                        </Heading>
                        <Text color="slate.300" fontSize="md" lineHeight="relaxed" opacity="0.8">
                            Sign in to your administrator dashboard to manage posts, track real-time analytics, and control your blog ecosystem.
                        </Text>
                    </VStack>
                    
                    <Box mt="12" alignSelf="center" position="relative" zIndex="2">
                        <img 
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                            alt="Analytics Dashboard View"
                            style={{ 
                                width: '100%', 
                                borderRadius: '12px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        />
                    </Box>
                </Flex>
                <Center w={{ base: "100%", md: "55%" }} p={{ base: "6", md: "16" }}>
                    <Box w="100%" maxW="400px">
                        <LoginForm /> 
                    </Box>
                </Center>
            </Flex>
        </Center>
    );
};

export default Login;