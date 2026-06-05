
import React, { useState, useEffect } from 'react';
import { Box, Text, Grid, ProgressCircle, Progress, HStack, VStack, Heading } from '@chakra-ui/react';
import { Card } from '../../components/common';

const ServerStatus = () => {

    const [serverMetrics, setServerMetrics] = useState({
        cpu: 42,
        ramUsed: 4.1,
        ramTotal: 8.0,
        responseTime: 45,
        uptime: '5d 12h 34m'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setServerMetrics(prev => {
                const randomCpu = Math.floor(Math.random() * (85 - 30 + 1)) + 30; // 30% থেকে 85% এর মধ্যে ফ্ল্যাকচুয়েট করবে
                const randomRam = parseFloat((Math.random() * (5.8 - 3.8) + 3.8).toFixed(1));
                const randomPing = Math.floor(Math.random() * (60 - 35 + 1)) + 35;
                
                return {
                    ...prev,
                    cpu: randomCpu,
                    ramUsed: randomRam,
                    responseTime: randomPing
                };
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const ramPercentage = (serverMetrics.ramUsed / serverMetrics.ramTotal) * 100;
    const isCpuCritical = serverMetrics.cpu > 80;

    return (
        <>
            <Card p="5">
            <Heading size="md" mb="4" color="slate.800">Server Status & System Health</Heading>
        
            <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap="6" align={{ base: "stretch", md: "center" }}>
                {/* CPU Circular Progress Area */}
                <VStack align="center" justify="center" p="3" bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.100">
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase">CPU Load</Text>
                    <Box my="2">
                        <ProgressCircle.Root value={serverMetrics.cpu} size="xl" colorPalette={isCpuCritical ? "red" : "teal"}>
                            <ProgressCircle.ValueText fontSize="xl" fontWeight="bold" color={isCpuCritical ? "red.600" : "teal.700"}>
                                {serverMetrics.cpu}%
                            </ProgressCircle.ValueText>
                            <ProgressCircle.Circle>
                                <ProgressCircle.Track />
                                <ProgressCircle.Range />
                            </ProgressCircle.Circle>
                        </ProgressCircle.Root>
                    </Box>
                    <Text fontSize="11px" color={isCpuCritical ? "red.500" : "gray.400"} fontWeight={isCpuCritical ? "bold" : "normal"}>
                        {isCpuCritical ? "High Load Warning" : "System Running Smooth"}
                    </Text>
                </VStack>

                {/* RAM & Meta Metrics Area */}
                <VStack align="stretch" gap="4">
                    {/* Linear RAM Tracker (Fixed using Progress.Root) */}
                    <Box>
                        <HStack justify="space-between" mb="1" fontSize="xs">
                            <Text fontWeight="bold" color="gray.500" textTransform="uppercase">RAM Usage</Text>
                            <Text fontWeight="semibold" color="gray.700">{serverMetrics.ramUsed} GB / {serverMetrics.ramTotal} GB</Text>
                        </HStack>
                        <Progress.Root value={ramPercentage} colorPalette="blue" size="sm" borderRadius="full">
                            <Progress.Track bg="gray.100">
                                <Progress.Range borderRadius="full" />
                            </Progress.Track>
                        </Progress.Root>
                    </Box>

                    {/* Meta Info Grid */}
                    <Grid templateColumns="repeat(2, 1fr)" gap="4" pt="2">
                        <Box p="3" bg="gray.50" borderRadius="md">
                            <Text fontSize="10px" fontWeight="bold" color="gray.400" textTransform="uppercase">API Response Time</Text>
                            <Text fontSize="md" fontWeight="bold" color="green.600">{serverMetrics.responseTime} ms</Text>
                            <Text fontSize="10px" color="gray.400">Optimal (Excellent)</Text>
                        </Box>
                        <Box p="3" bg="gray.50" borderRadius="md">
                            <Text fontSize="10px" fontWeight="bold" color="gray.400" textTransform="uppercase">Server Uptime</Text>
                            <Text fontSize="md" fontWeight="bold" color="slate.700">{serverMetrics.uptime}</Text>
                            <Text fontSize="10px" color="gray.400">0 Downtime Incidents</Text>
                        </Box>
                    </Grid>
                </VStack>
            </Grid>
        </Card>
        </>
    )
}

export default ServerStatus