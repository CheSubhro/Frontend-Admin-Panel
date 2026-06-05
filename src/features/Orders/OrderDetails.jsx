
import React from 'react';
import { 
    Box, 
    VStack, 
    HStack, 
    Text, 
    Table, 
    Separator, 
    Grid, 
    GridItem 
} from '@chakra-ui/react';
import { Badge } from '../../components/common';

const OrderDetails = ({ order }) => {

    if (!order) return null;
    return (
        <>
            <VStack align="stretch" gap="5" p="2">
                <Grid templateColumns="repeat(2, 1fr)" gap="4">
                    <GridItem>
                        <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Customer Info</Text>
                        <Text fontWeight="semibold" color="gray.800" mt="1">{order.customerName}</Text>
                        <Text fontSize="sm" color="gray.500">{order.email}</Text>
                    </GridItem>
                    <GridItem>
                        <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Payment Method</Text>
                        <HStack mt="1" gap="2">
                            <Text fontWeight="medium" color="gray.800">{order.paymentMethod}</Text>
                            <Badge status={order.paymentStatus === 'Paid' ? 'success' : 'error'}>
                                {order.paymentStatus}
                            </Badge>
                        </HStack>
                    </GridItem>
                </Grid>

                <Separator />

                <Box>
                    <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Shipping Address</Text>
                    <Text fontSize="sm" color="gray.700" mt="1">{order.shippingAddress}</Text>
                </Box>

                <Separator />

                <Box>
                    <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase" mb="2">Ordered Items</Text>
                    <Table.Root size="sm" variant="line">
                        <Table.Header>
                            <Table.Row bg="gray.50">
                                <Table.ColumnHeader p="2">Product Name</Table.ColumnHeader>
                                <Table.ColumnHeader p="2" textAlign="center">Price</Table.ColumnHeader>
                                <Table.ColumnHeader p="2" textAlign="center">Qty</Table.ColumnHeader>
                                <Table.ColumnHeader p="2" textAlign="right">Total</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {order.items.map((item, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell p="2" fontWeight="medium" color="gray.700">{item.name}</Table.Cell>
                                    <Table.Cell p="2" textAlign="center">${item.price.toFixed(2)}</Table.Cell>
                                    <Table.Cell p="2" textAlign="center">x{item.quantity}</Table.Cell>
                                    <Table.Cell p="2" textAlign="right" fontWeight="semibold">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Box>

                <Box bg="gray.50" p="3" borderRadius="md">
                    <HStack justify="space-between">
                        <Text fontWeight="bold" color="gray.700">Grand Total:</Text>
                        <Text fontWeight="bold" fontSize="lg" color="blue.600">
                            ${order.totalAmount.toFixed(2)}
                        </Text>
                    </HStack>
                </Box>
            </VStack>
        </>
    )
}

export default OrderDetails