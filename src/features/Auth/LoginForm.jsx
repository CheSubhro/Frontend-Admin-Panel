

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Field, 
  Input, 
  Heading, 
  Text, 
  VStack,
  Stack,
  HStack,
  Link
} from '@chakra-ui/react';
import { loginStart, loginSuccess, loginFailure } from '../../store/authSlice';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
        dispatch(loginFailure("Please fill in all fields!"));
        return;
        }

        dispatch(loginStart());

        setTimeout(() => {
        if (email === 'admin@blog.com' && password === '123456') {
            const dummyResponse = {
            token: 'jwt-mock-token-xyz123',
            user: { id: 1, fullName: 'Che Subhro', email: 'admin@blog.com', role: 'Admin' }
            };
            dispatch(loginSuccess(dummyResponse));
            navigate('/admin');
        } else {
            dispatch(loginFailure("Invalid credentials! Try: admin@blog.com / 123456"));
        }
        }, 1200);
    };

    return (
        <Box w="100%" bg="white">
        <VStack spaceY="7" align="stretch">
            
            <Stack spaceY="2" align="stretch">
            <Text fontSize="xs" fontWeight="bold" color="blue.600" letterSpacing="widest" textTransform="uppercase">
                🔐 Secure Admin Access
            </Text>
            <Heading size="2xl" fontWeight="bold" color="slate.900" letterSpacing="tight">
                Sign In to Portal
            </Heading>
            <Text color="gray.500" fontSize="sm">
                Enter your authorized email and security key below.
            </Text>
            </Stack>

            <form onSubmit={handleSubmit}>
                <VStack spaceY="5" align="stretch">
                    
                    <Field.Root invalid={!!error}>
                    <Field.Label fontWeight="medium" color="gray.700" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                        Email Address
                    </Field.Label>
                    <Input 
                        type="email" 
                        placeholder="name@company.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        h="11"
                        borderRadius="lg"
                        borderColor="gray.200"
                        px="4"
                        fontSize="sm"
                        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3b82f6" }}
                    />
                    </Field.Root>

                    <Field.Root invalid={!!error}>
                    <HStack justify="space-between" w="100%" mb="1">
                        <Field.Label fontWeight="medium" color="gray.700" fontSize="xs" textTransform="uppercase" letterSpacing="wider" mb="0">
                        Password
                        </Field.Label>
                        <Link 
                        as={RouterLink} 
                        to="/forgot-password" 
                        color="blue.600" 
                        fontSize="xs"
                        fontWeight="medium"
                        _hover={{ color: "blue.700", textDecoration: "underline" }}
                        >
                        Forgot password?
                        </Link>
                    </HStack>
                    <Input 
                        type="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        h="11"
                        borderRadius="lg"
                        borderColor="gray.200"
                        px="4"
                        fontSize="sm"
                        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3b82f6" }}
                    />
                    </Field.Root>

                    {error && (
                    <Text color="red.500" fontSize="xs" fontWeight="medium" textAlign="center" bg="red.50" p="2" borderRadius="md">
                        {error}
                    </Text>
                    )}

                    <Button 
                        type="submit" 
                        w="100%" 
                        h="11"
                        borderRadius="lg"
                        bg="blue.600" 
                        color="white"
                        fontWeight="semibold"
                        fontSize="sm"
                        loading={loading}
                        loadingText="Authenticating..."
                        _hover={{ bg: "blue.700" }}
                        boxShadow="0 4px 12px rgba(37, 99, 235, 0.2)"
                        mt="2"
                    >
                    Sign In to Dashboard
                    </Button>
                </VStack>
            </form>

            <Text fontSize="xs" color="gray.500" textAlign="center">
            Need access?{' '}
            <Link 
                as={RouterLink} 
                to="/signup" 
                color="blue.600" 
                fontWeight="semibold"
                _hover={{ textDecoration: "underline" }}
            >
                SignUp
            </Link>
            </Text>

        </VStack>
        </Box>
    );
};

export default LoginForm;