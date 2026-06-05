
import React from 'react';
import { Box } from '@chakra-ui/react';
import DashboardOverview from '../features/Dashboard/DashboardOverview';

const Dashboard = () => {
    
    return (
        <Box p={{ base: "4", md: "6" }}>
            <DashboardOverview />
        </Box>
    );
};

export default Dashboard;