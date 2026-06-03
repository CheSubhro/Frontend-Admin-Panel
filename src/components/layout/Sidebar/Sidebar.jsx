
// src/components/layout/Sidebar/Sidebar.jsx
import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, VStack, Heading, Text, Link, Flex, HStack, Separator } from '@chakra-ui/react';
import useAuth from '../../../hooks/useAuth'; 

const Sidebar = () => {
    const { logout, user } = useAuth();

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: '📊' },
        { name: 'Products', path: '/admin/products', icon: '📦' },
        { name: 'Categories', path: '/admin/categories', icon: '📁' },
        { name: 'Users', path: '/admin/users', icon: '👥' },
        { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
    ];

    return (

        <Flex direction="column" h="100%" p="6" justify="space-between" color="slate.300">
            <Box>
                <HStack spaceX="3" mb="8" align="center">
                    <Box bg="blue.500" p="2" borderRadius="lg" color="white" fontWeight="bold" fontSize="lg">
                        A✍️
                    </Box>
                    <Heading size="md" fontWeight="bold" color="white" letterSpacing="tight">
                        AdminPanel
                    </Heading>
                </HStack>

                <Separator borderColor="rgba(255,255,255,0.08)" mb="6" />
                <VStack spaceY="2" align="stretch">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            as={RouterLink}
                            to={item.path}
                            end
                            style={({ isActive }) => ({
                                display: 'block',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                backgroundColor: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                                color: isActive ? '#60a5fa' : '#94a3b8',
                                transition: 'all 0.2s',
                            })}
                            _hover={{ bg: "rgba(255,255,255,0.03)", color: "white", textDecoration: "none" }}
                        >
                            <HStack spaceX="3">
                                <Text fontSize="md">{item.icon}</Text>
                                <Text>{item.name}</Text>
                            </HStack>
                        </Link>
                    ))}
                </VStack>
            </Box>

        <Box>
            <Separator borderColor="rgba(255,255,255,0.08)" mb="4" />
            
            <Link
                onClick={logout}
                style={{
                    display: 'block',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#ef4444',
                    cursor: 'pointer'
                }}
                _hover={{ bg: "rgba(239, 68, 68, 0.1)", textDecoration: "none" }}
            >
            <HStack spaceX="3">
                <Text fontSize="md">🚪</Text>
                <Text>Sign Out</Text>
            </HStack>
            </Link>
        </Box>

        </Flex>
    );
};

export default Sidebar;