

import React, { useState } from 'react';
import { Button, Field, Input, VStack, Text } from '@chakra-ui/react';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulating API call to send recovery email
        setTimeout(() => {
            setLoading(false);
            setIsSubmitted(true);
        }, 1200);
    };

    if (isSubmitted) {
        return (
            <VStack spaceY="4" align="center" textAlign="center">
                <Text color="green.500" fontWeight="semibold" fontSize="sm">
                    🚀 Recovery Link Sent!
                </Text>
                <Text color="gray.600" fontSize="sm">
                    Please check your email <strong>{email}</strong> for instructions to reset your password.
                </Text>
            </VStack>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack spaceY="4" align="stretch">
                {/* Email Field */}
                <Field.Root>
                    <Field.Label fontWeight="medium" color="gray.700" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                        Registered Email
                    </Field.Label>
                    <Input 
                        type="email" 
                        placeholder="admin@blog.com" 
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

                {/* Submit Button */}
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
                    loadingText="Sending Link..." 
                    _hover={{ bg: "blue.700" }} 
                    boxShadow="0 4px 12px rgba(37, 99, 235, 0.2)" 
                    mt="2"
                >
                    Send Recovery Link
                </Button>
            </VStack>
        </form>
    );
};

export default ForgotPasswordForm;