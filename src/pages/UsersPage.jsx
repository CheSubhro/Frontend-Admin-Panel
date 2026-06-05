
import React from 'react';
import { Box } from '@chakra-ui/react';
import CustomerList from '../features/Users/CustomerList';



const UsersPage = () => {
    return (
        <>
            <Box p={{ base: "4", md: "6" }}>
                <CustomerList />
            </Box>
        </>
    )
}

export default UsersPage