
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Flex, HStack, Text, Center, Input, Group } from '@chakra-ui/react';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    
    const userInitials = user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('') : 'A';

    return (
        <Flex 
            w="100%" 
            h="70px" 
            px={{ base: "4", md: "8" }} 
            align="center" 
            justify="space-between"
            bg="white"
        >
        <Box display={{ base: "none", sm: "block" }} w="300px">
            <Input 
                placeholder="Search anything..." 
                size="sm"
                bg="#f4f6f9"
                border="none"
                h="10"
                borderRadius="xl"
                px="4"
                _focus={{ bg: "#eaedf2", borderColor: "blue.500" }}
            />
        </Box>

        <Box display={{ base: "block", md: "none" }}>
            <Text fontWeight="bold" color="blue.600" fontSize="lg">B✍️ BlogAdmin</Text>
        </Box>

        <HStack spaceX="4">
            
            <Center 
                w="10" 
                h="10" 
                borderRadius="xl" 
                bg="#f4f6f9" 
                cursor="pointer" 
                _hover={{ bg: "#eaedf2" }}
                fontSize="lg"
            >
            🔔
            </Center>

            <HStack spaceX="3" cursor="pointer" p="1" borderRadius="xl" _hover={{ bg: "gray.50" }}>
            <Center 
                w="10" 
                h="10" 
                borderRadius="full" 
                bg="blue.600" 
                color="white" 
                fontWeight="bold"
                fontSize="sm"
                boxShadow="0 4px 10px rgba(37, 99, 235, 0.2)"
            >
                {userInitials}
            </Center>
            
            <Box display={{ base: "none", sm: "block" }} textAlign="left">
                <Text fontSize="sm" fontWeight="semibold" color="slate.900" lineHeight="1.2">
                {user?.fullName || 'Che Subhro'}
                </Text>
                <Text fontSize="11px" color="gray.400" fontWeight="medium">
                {user?.role || 'Administrator'}
                </Text>
            </Box>
            </HStack>

        </HStack>
        </Flex>
    );
};

export default Navbar;