
import React, { useState } from 'react';
import { Box, Table, Heading, Flex, Text, useDisclosure, HStack } from '@chakra-ui/react';
import { FiEye, FiSlash, FiCheckCircle } from 'react-icons/fi';

import mockUsers from '../../assets/mock-data/users.json';
import { Card, Button, Input, Pagination, Badge, Modal } from '../../components/common';
import { usePagination } from '../../hooks/usePagination';
import UserRoleSelect from './UserRoleSelect';
import UserDetailsModal from './UserDetailsModal';

const CustomerList = () => {

    const [users, setUsers] = useState(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const detailsModal = useDisclosure();

    // Search Logic (Name, Email or Phone)
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
    );

    // Pagination (Showing 5 items per page)
    const { 
        currentPage, 
        totalPages, 
        currentItems: currentUsers, 
        handlePageChange,
        resetPage
    } = usePagination(filteredUsers, 5);

    // Dynamic Role Update Handler
    const handleRoleChange = (userId, newRole) => {
        setUsers(prev => prev.map(user => 
            user.id === userId ? { ...user, role: newRole } : user
        ));
    };

    // Toggle Suspend / Active User Status
    const toggleUserStatus = (userId) => {
        setUsers(prev => prev.map(user => {
            if (user.id === userId) {
                const updatedStatus = user.status === 'Active' ? 'Suspended' : 'Active';
                return { ...user, status: updatedStatus };
            }
            return user;
        }));
    };

    return (
        <>
            <Box spaceY="6">
                {/* Header */}
                <Flex justify="space-between" align="center" mb="6">
                    <Box>
                        <Heading size="lg" fontWeight="bold" color="slate.800">User Management</Heading>
                        <Text color="gray.500" fontSize="sm">Monitor customer behavior, lifetime values, and manage administrative roles.</Text>
                    </Box>
                </Flex>

                {/* Search Filter Bar */}
                <Card p="4" mb="6">
                    <HStack maxW="md">
                        <Input 
                            placeholder="Search by Name, Email or Phone..." 
                            value={searchTerm}
                            mb="0"
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                resetPage();
                            }}
                        />
                    </HStack>
                </Card>

                {/* Main Table */}
                <Card p="6">
                    <Box overflowX="auto">
                        <Table.Root interactive size="sm">
                            <Table.Header>
                                <Table.Row bg="gray.50" h="10">
                                    <Table.ColumnHeader p="3">User Details</Table.ColumnHeader>
                                    <Table.ColumnHeader p="3">System Role</Table.ColumnHeader>
                                    <Table.ColumnHeader p="3">Total Orders</Table.ColumnHeader>
                                    <Table.ColumnHeader p="3">Lifetime Spending</Table.ColumnHeader>
                                    <Table.ColumnHeader p="3">Account Status</Table.ColumnHeader>
                                    <Table.ColumnHeader p="3" textAlign="right">Actions</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {currentUsers.map((user) => (
                                    <Table.Row key={user.id} h="14">
                                        {/* Name & Contact */}
                                        <Table.Cell p="3">
                                            <Box>
                                                <Text fontWeight="semibold" color="gray.800">{user.name}</Text>
                                                <Text fontSize="xs" color="gray.400">{user.email} • {user.phone}</Text>
                                            </Box>
                                        </Table.Cell>

                                        {/* Role Selection Dropdown */}
                                        <Table.Cell p="3">
                                            <UserRoleSelect 
                                                currentRole={user.role} 
                                                onChange={(newRole) => handleRoleChange(user.id, newRole)} 
                                            />
                                        </Table.Cell>

                                        {/* Order Count */}
                                        <Table.Cell p="3" fontWeight="medium" color="gray.700">
                                            {user.totalOrders} Orders
                                        </Table.Cell>

                                        {/* Spending */}
                                        <Table.Cell p="3" fontWeight="bold" color="gray.800">
                                            ₹{user.lifetimeSpending.toLocaleString('en-IN')}
                                        </Table.Cell>

                                        {/* Badge Status */}
                                        <Table.Cell p="3">
                                            <Badge status={user.status === 'Active' ? 'success' : 'error'}>
                                                {user.status}
                                            </Badge>
                                        </Table.Cell>

                                        {/* Quick Actions buttons */}
                                        <Table.Cell p="3" textAlign="right">
                                            <HStack gap="2" justify="flex-end">
                                                <Button 
                                                    size="xs" 
                                                    variant="outline"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        detailsModal.onOpen();
                                                    }}
                                                >
                                                    <FiEye /> View Profile
                                                </Button>
                                                <Button 
                                                    size="xs" 
                                                    variant="ghost"
                                                    colorScheme={user.status === 'Active' ? 'red' : 'green'}
                                                    onClick={() => toggleUserStatus(user.id)}
                                                >
                                                    {user.status === 'Active' ? <FiSlash /> : <FiCheckCircle />}
                                                </Button>
                                            </HStack>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Box>

                    {/* Pagination */}
                    <Box mt="6">
                        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                    </Box>
                </Card>

                {/* Details Profile Modal overlay */}
                <Modal 
                    isOpen={detailsModal.open} 
                    onClose={detailsModal.onClose} 
                    title="Detailed User Profile"
                    size="md"
                >
                    <UserDetailsModal user={selectedUser} />
                </Modal>
            </Box>
        </>
    )
}

export default CustomerList