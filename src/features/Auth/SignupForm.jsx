
// src/features/Auth/SignupForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Field, 
  Input, 
  VStack 
} from '@chakra-ui/react';

const SignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        setLoading(true);
        
        setTimeout(() => {
            setLoading(false);
            alert("Account created successfully! Please login.");
            navigate('/login');
        }, 1200);
    };

    return (
        <form onSubmit={handleSignup}>
            <VStack spaceY="4" align="stretch">
                <Field.Root>
                    <Field.Label fontWeight="medium" color="gray.700" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                        Full Name
                    </Field.Label>
                    <Input 
                        type="text" 
                        placeholder="John Doe" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        h="11" 
                        borderRadius="lg" 
                        borderColor="gray.200" 
                        px="4" 
                        fontSize="sm" 
                        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3b82f6" }} 
                        required 
                    />
                </Field.Root>

                <Field.Root>
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
                        required 
                    />
                </Field.Root>

                <Field.Root>
                    <Field.Label fontWeight="medium" color="gray.700" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                        Security Password
                    </Field.Label>
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
                        required 
                    />
                </Field.Root>

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
                    loadingText="Creating Account..." 
                    _hover={{ bg: "blue.700" }} 
                    boxShadow="0 4px 12px rgba(37, 99, 235, 0.2)" 
                    mt="2"
                >
                    Register Admin Access
                </Button>
            </VStack>
        </form>
    );
};

export default SignupForm;