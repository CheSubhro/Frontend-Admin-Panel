
import React from 'react';
import { Box, Grid, GridItem, Heading, Text, Flex, HStack, Icon,VStack } from '@chakra-ui/react';
import { FiDollarSign, FiShoppingBag, FiUsers, FiAlertCircle, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import dashboardData from '../../assets/mock-data/dashboard.json';
import { Card } from '../../components/common';
import ServerStatus from './ServerStatus';

const DashboardOverview = () => {

    const { metrics, salesHistory } = dashboardData;

    const cardsConfig = [
        {
            title: 'Total Sales',
            value: `₹${metrics.totalSales.toLocaleString('en-IN')}`,
            trend: '+12% vs last week',
            isPositive: true,
            icon: FiDollarSign,
            color: 'green'
        },
        {
            title: 'Active Products',
            value: metrics.activeProducts,
            trend: '+4 new added today',
            isPositive: true,
            icon: FiShoppingBag,
            color: 'blue'
        },
        {
            title: 'Total Customers',
            value: metrics.totalCustomers,
            trend: '+8% this month',
            isPositive: true,
            icon: FiUsers,
            color: 'purple'
        },
        {
            title: 'Pending Orders',
            value: metrics.pendingOrders,
            trend: 'Requires attention',
            isPositive: false,
            icon: FiAlertCircle,
            color: 'red'
        }
    ];
    return (
        <>
            <Box spaceY="6">
                {/* Header Greeting */}
                <Box mb="6">
                    <Heading size="lg" fontWeight="bold" color="slate.800">Welcome Back, Admin!</Heading>
                    <Text color="gray.500" fontSize="sm">
                        Here's a snapshot of your platform's economic overview and underlying microservice health.
                    </Text>
                </Box>

                {/* Top Metrics Cards Grid */}
                <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap="5">
                    {cardsConfig.map((card, idx) => (
                        <Card p="5" key={idx} position="relative" overflow="hidden">
                            <Flex justify="space-between" align="start">
                                <VStack align="start" gap="1">
                                    <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">{card.title}</Text>
                                    <Heading size="md" fontWeight="bold" color="gray.800">{card.value}</Heading>
                                </VStack>
                                <Box p="2.5" bg={`${card.color}.50`} color={`${card.color}.600`} borderRadius="lg">
                                    <Icon as={card.icon} boxSize="5" />
                                </Box>
                            </Flex>
                            <HStack mt="4" fontSize="xs" color={card.isPositive ? "green.600" : "red.500"} fontWeight="medium">
                                {card.isPositive ? <FiArrowUpRight /> : <FiArrowDownRight />}
                                <Text>{card.trend}</Text>
                            </HStack>
                        </Card>
                    ))}
                </Grid>

                {/* Bottom Analytics & Infrastructure Grid */}
                <Grid templateColumns={{ base: "1fr", xl: "3fr 2fr" }} gap="6" pt="2">
                    {/* Sales & Analytics Chart (Recharts AreaChart) */}
                    <Card p="5">
                        <Heading size="md" mb="4" color="slate.800">Sales & Orders Revenue Graph</Heading>
                        <Box h="260px" w="100%">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3182ce" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#3182ce" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="date" stroke="#a0aec0" fontSize={11} tickLine={false} />
                                    <YAxis stroke="#a0aec0" fontSize={11} tickLine={false} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="sales" name="Sales (₹)" stroke="#3182ce" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Box>
                    </Card>

                    {/* Live Real-time Server Tracking Component */}
                    <ServerStatus />
                </Grid>
            </Box>
        </>
    )
}

export default DashboardOverview