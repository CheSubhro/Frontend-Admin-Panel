
import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Heading, 
  Text, 
  SimpleGrid, 
  Flex, 
  Table, 
  Stack,
  HStack
} from '@chakra-ui/react';

import mockUsers from '../assets/mock-data/users.json';

import { Card, Badge } from '../components/common';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);

    const activeUsersCount = mockUsers.filter(u => u.status === 'Active').length;

    const stats = [
        { title: 'Total Posts', value: '142', icon: '📝', bg: '#eff6ff', color: '#1e40af' },
        { title: 'Total Views', value: '45.2K', icon: '👁️', bg: '#f0fdf4', color: '#166534' },
        { title: 'Categories', value: '18', icon: '📁', bg: '#fdf2f8', color: '#9d174d' },
        { title: 'Active System Users', value: activeUsersCount.toString(), icon: '👥', bg: '#fef3c7', color: '#92400e' }, // 🆕 ডায়নামিক ভ্যালু
    ];

    return (
        <Box>
            <Stack spaceY="1" mb="8">
                <Heading size="xl" fontWeight="bold" color="slate.900">
                    Welcome back, {user?.fullName || 'Che Subhro'}!
                </Heading>
                <Text color="gray.500" fontSize="sm">
                    Here is what is happening with your blog platform today.
                </Text>
            </Stack>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="6" mb="10">
                {stats.map((stat, index) => (
                    <Card 
                        key={index} 
                        align="center" 
                        justify="space-between" 
                        display="flex" 
                        flexDirection="row"
                    >
                        <Stack spaceY="1">
                            <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase" letterSpacing="wider">
                                {stat.title}
                            </Text>
                            <Heading size="2xl" fontWeight="bold" color="slate.800">
                                {stat.value}
                            </Heading>
                        </Stack>
                        <Flex w="12" h="12" borderRadius="xl" bg={stat.bg} color={stat.color} fontSize="xl" align="center" justify="center">
                            {stat.icon}
                        </Flex>
                    </Card>
                ))}
            </SimpleGrid>

            <Card>
                <Heading size="md" fontWeight="bold" color="slate.800" mb="5">
                    System Authorized Users (From JSON)
                </Heading>

                <Box overflowX="auto">
                    <Table.Root interactive size="sm">
                        <Table.Header>
                            <Table.Row bg="gray.50" h="10">
                                <Table.ColumnHeader color="gray.600" fontWeight="semibold">Full Name</Table.ColumnHeader>
                                <Table.ColumnHeader color="gray.600" fontWeight="semibold">Email</Table.ColumnHeader>
                                <Table.ColumnHeader color="gray.600" fontWeight="semibold">Role</Table.ColumnHeader>
                                <Table.ColumnHeader color="gray.600" fontWeight="semibold">Status</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {mockUsers.map((mUser) => (
                                <Table.Row key={mUser.id} _hover={{ bg: 'gray.50' }} h="14">
                                    <Table.Cell fontWeight="medium" color="slate.900">{mUser.fullName}</Table.Cell>
                                    <Table.Cell color="gray.600">{mUser.email}</Table.Cell>
                                    <Table.Cell color="gray.600">
                                        <Badge status={mUser.role} variant="subtle" colorScheme="blue" />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge status={mUser.status} />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Box>
            </Card>
        </Box>
    );
};

export default Dashboard;