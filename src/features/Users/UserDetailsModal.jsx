
import React from 'react';
import { Box, VStack, HStack, Text, Grid, GridItem, Separator } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';

const UserDetailsModal = ({ user }) => {

    if (!user) return null;
    return (
        <>
            <VStack align="stretch" gap="5" p="2">
                <HStack gap="4">
                    <Avatar.Root size="lg">
                        <Avatar.Image src={user.avatar} name={user.name} />
                        <Avatar.Fallback name={user.name} />
                    </Avatar.Root>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold" color="gray.800">{user.name}</Text>
                        <Text fontSize="xs" fontWeight="semibold" color="blue.600" fontFamily="mono">{user.id}</Text>
                    </Box>
                </HStack>

                <Separator />

                <Grid templateColumns="repeat(2, 1fr)" gap="4">
                    <GridItem>
                        <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Contact Details</Text>
                        <Text fontSize="sm" fontWeight="medium" color="gray.700" mt="1">{user.email}</Text>
                        <Text fontSize="xs" color="gray.500">{user.phone}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Account Info</Text>
                        <Text fontSize="sm" fontWeight="medium" color="gray.700" mt="1">Joined: {new Date(user.joinDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}</Text>
                        <Text fontSize="xs" color="gray.500">Status: {user.status}</Text>
                    </GridItem>
                </Grid>

                <Separator />

                <Grid templateColumns="repeat(2, 1fr)" gap="4">
                    <Box bg="green.50" p="3" borderRadius="md" border="1px solid" borderColor="green.100">
                        <Text fontSize="xs" color="green.600" fontWeight="bold" textTransform="uppercase">Lifetime Spending</Text>
                        <Text fontSize="xl" fontWeight="bold" color="green.700" mt="1">₹{user.lifetimeSpending.toLocaleString('en-IN')}</Text>
                    </Box>
                    <Box bg="blue.50" p="3" borderRadius="md" border="1px solid" borderColor="blue.100">
                        <Text fontSize="xs" color="blue.600" fontWeight="bold" textTransform="uppercase">Total Orders</Text>
                        <Text fontSize="xl" fontWeight="bold" color="blue.700" mt="1">{user.totalOrders} Orders</Text>
                    </Box>
                </Grid>

                <Separator />

                <Box>
                    <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase" mb="2">System Activity Log</Text>
                    <VStack align="stretch" gap="2" bg="gray.50" p="3" borderRadius="md" fontSize="xs">
                        <HStack justify="space-between" color="gray.600">
                            <Text>• Account authenticated via dashboard</Text>
                            <Text color="gray.400">Just now</Text>
                        </HStack>
                        <HStack justify="space-between" color="gray.600">
                            <Text>• Role permissions mapped to '{user.role}'</Text>
                            <Text color="gray.400">System initialization</Text>
                        </HStack>
                    </VStack>
                </Box>
            </VStack>
        </>
    )
}

export default UserDetailsModal