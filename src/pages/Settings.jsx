
import React from 'react';
import { Box, Heading, Flex, Input, Button, Text as ChakraText } from '@chakra-ui/react';

const Settings = () => {
    return (
        <Box spaceY="6" p={{ base: "4", md: "8" }}>
            {/* Header Section */}
            <Box mb="6">
                <Heading size="lg" fontWeight="bold" color="textMain">Settings</Heading>
                <ChakraText color="textSub" fontSize="sm">
                    Manage your account preferences and application configurations.
                </ChakraText>
            </Box>

            {/* Content Card Layout */}
            <Box p="6" bg="bgSurface" borderRadius="xl" boxShadow="sm" maxW="2xl" spaceY="6">
                
                {/*  Profile Settings Section */}
                <Box spaceY="3">
                    <Heading size="sm" fontWeight="semibold" color="textMain">Profile Configuration</Heading>
                    <Input 
                        placeholder="Full Name" 
                        defaultValue="Che Subhro" 
                        bg="bgButton" 
                        color="textMain" 
                        border="none" 
                        h="10" 
                        borderRadius="xl" 
                        px="4"
                        _focus={{ bg: "bgButtonHover" }}
                    />
                    <Button colorPalette="blue" borderRadius="xl" px="6">
                        Save Changes
                    </Button>
                </Box>

                <hr style={{ borderColor: "var(--chakra-colors-gray-200)", opacity: 0.2 }} />

                {/*  Application Configuration Section */}
                <Box spaceY="4">
                    <Heading size="sm" fontWeight="semibold" color="textMain">App Settings</Heading>
                    
                    {/* Maintenance Mode Option */}
                    <Flex align="center" justify="space-between" py="2">
                        <Box>
                            <ChakraText color="textMain" fontWeight="medium">Maintenance Mode</ChakraText>
                            <ChakraText color="textSub" fontSize="xs">Temporarily disable the public client frontend.</ChakraText>
                        </Box>
                        {/* Native/Clean checkbox styling fallback for seamless integration */}
                        <input 
                            type="checkbox" 
                            style={{ width: "40px", height: "20px", cursor: "pointer" }} 
                        />
                    </Flex>

                    {/* Email Notifications Option */}
                    <Flex align="center" justify="space-between" py="2">
                        <Box>
                            <ChakraText color="textMain" fontWeight="medium">Email Notifications</ChakraText>
                            <ChakraText color="textSub" fontSize="xs">Receive real-time alerts about server load and updates.</ChakraText>
                        </Box>
                        <input 
                            type="checkbox" 
                            defaultChecked
                            style={{ width: "40px", height: "20px", cursor: "pointer" }} 
                        />
                    </Flex>
                </Box>

            </Box>
        </Box>
    );
};

export default Settings;