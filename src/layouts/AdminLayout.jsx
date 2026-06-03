
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import Sidebar from '../components/layout/Sidebar/Sidebar';

const AdminLayout = () => {
    return (
        <>
            <Flex minH="100vh" w="100vw" bg="#f8fafc" overflow="hidden">
      
                <Box 
                    w="260px" 
                    minW="260px" 
                    bg="#0f172a" 
                    display={{ base: "none", md: "block" }} 
                    position="sticky"
                    top="0"
                    h="100vh"
                    boxShadow="xl"
                    zIndex="10"
                >
                    <Sidebar />
                </Box>

                <Flex flex="1" direction="column" minW="0" h="100vh" overflowY="auto">                    
                    <Box 
                        position="sticky" 
                        top="0" 
                        bg="white" 
                        borderBottom="1px solid" 
                        borderColor="gray.100"
                        zIndex="9"
                    >
                        <Navbar />
                    </Box>

                    <Box 
                        as="main" 
                        flex="1" 
                        p={{ base: "4", md: "8" }} 
                        bg="#f8fafc" 
                    >
                        <Outlet /> 
                    </Box>

                    <Box 
                        bg="white" 
                        borderTop="1px solid" 
                        borderColor="gray.100" 
                        py="4"
                    >
                        <Footer />
                    </Box>

                </Flex>
            </Flex>
        </>
    );
};

export default AdminLayout;