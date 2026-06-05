
import React from 'react';
import { Box } from '@chakra-ui/react';
import { OrderList } from '../features/Orders';

const OrdersPage = () => {
    return (
        <>
            <Box p={{ base: "4", md: "6" }}>
                <OrderList />
            </Box>
        </>
    )
}

export default OrdersPage