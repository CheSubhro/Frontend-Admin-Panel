
import React, { useState } from 'react';
import { 
    Box, 
    Table, 
    Heading, 
    Flex, 
    HStack,
    Text,
    useDisclosure,
    NativeSelect
} from '@chakra-ui/react';
import { FiDownload, FiEye } from 'react-icons/fi';

import mockOrders from '../../assets/mock-data/orders.json'; // Mock Data
import { Card, Button, Input, Pagination, Modal, EmptyState } from '../../components/common'; // Common Components
import { usePagination } from '../../hooks/usePagination'; // Custom Hooks
import OrderStatusSelect from './OrderStatusSelect';
import OrderDetails from './OrderDetails';
import * as XLSX from 'xlsx'; // SheetJS Library

const OrderList = () => {

    const [orders, setProducts] = useState(mockOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const detailsModal = useDisclosure();

    // Search (by ID or Customer Name) and Filter (by Status) Logic
    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'All' || order.orderStatus === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Client-side pagination (Showing 10 orders per page)
    const { 
        currentPage, 
        totalPages, 
        currentItems: currentOrders, 
        handlePageChange,
        resetPage
    } = usePagination(filteredOrders, 10);

    // Update Single Order Status
    const handleStatusChange = (orderId, newStatus) => {
        setProducts(prevOrders => 
            prevOrders.map(order => 
                order.id === orderId ? { ...order, orderStatus: newStatus } : order
            )
        );
    };

    // Excel Export Handler 
    const handleExcelExport = () => {
        if (filteredOrders.length === 0) {
            alert("No orders available to export.");
            return;
        }

        const exportData = filteredOrders.map(order => ({
            'Order ID': order.id,
            'Customer Name': order.customerName,
            'Email': order.email,
            'Order Date': new Date(order.date).toLocaleDateString(),
            'Total Amount ($)': order.totalAmount,
            'Payment Method': order.paymentMethod,
            'Payment Status': order.paymentStatus,
            'Order Status': order.orderStatus,
            'Shipping Address': order.shippingAddress,
            'Total Items Purchased': order.items.reduce((sum, item) => sum + item.quantity, 0)
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders Summary");

        const maxProps = [{ wch: 12 }, { wch: 20 }, { wch: 25 }, { wch: 12 }, { wch: 18 }, { wch: 18 }, { wch: 15 }, { wch: 15 }, { wch: 40 }, { wch: 22 }];
        worksheet['!cols'] = maxProps;

        XLSX.writeFile(workbook, `Orders_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
    };
    return (
        <>
            <Box spaceY="6">
                <Flex justify="space-between" align="center" mb="6">
                    <Box>
                        <Heading size="lg" fontWeight="bold" color="slate.800">Order Management</Heading>
                        <Text color="gray.500" fontSize="sm">Track customer purchases, update fulfillment status, and export billing data.</Text>
                    </Box>
                    <Button 
                        variant="solid" 
                        colorScheme="teal" 
                        onClick={handleExcelExport}
                    >
                        <FiDownload style={{ marginRight: '6px' }} /> Export Orders (Excel)
                    </Button>
                </Flex>

                {/* Filters Section */}
                <Card p="4" mb="6">
                    <Flex gap="4" direction={{ base: 'column', md: 'row' }} align={{ md: 'center' }}>
                        <Box flex="1">
                            <Input 
                                placeholder="Search by Order ID or Customer Name..." 
                                value={searchTerm}
                                mb="0"
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    resetPage();
                                }}
                            />
                        </Box>
                        <Box maxW="200px">
                            <NativeSelect.Root size="sm">
                                <NativeSelect.Field 
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                        resetPage();
                                    }}
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </NativeSelect.Field>
                            </NativeSelect.Root>
                        </Box>
                    </Flex>
                </Card>

                {/* Main Content Area */}
                {filteredOrders.length === 0 ? (
                    <EmptyState 
                        title="No Orders Found" 
                        message="We couldn't find any orders matching your criteria. Try resetting the filters." 
                    />
                ) : (
                    <Card p="6">
                        <Box overflowX="auto">
                            <Table.Root interactive size="sm">
                                <Table.Header>
                                    <Table.Row bg="gray.50" h="10">
                                        <Table.ColumnHeader p="3">Order ID</Table.ColumnHeader>
                                        <Table.ColumnHeader p="3">Customer</Table.ColumnHeader>
                                        <Table.ColumnHeader p="3">Date</Table.ColumnHeader>
                                        <Table.ColumnHeader p="3">Total Amount</Table.ColumnHeader>
                                        <Table.ColumnHeader p="3">Fulfillment Status</Table.ColumnHeader>
                                        <Table.ColumnHeader p="3" textAlign="right">Actions</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {currentOrders.map((order) => (
                                        <Table.Row key={order.id} h="14">
                                            <Table.Cell p="3" fontWeight="semibold" color="blue.600" fontFamily="mono">
                                                {order.id}
                                            </Table.Cell>
                                            
                                            <Table.Cell p="3">
                                                <Box>
                                                    <Text fontWeight="medium" color="gray.800">{order.customerName}</Text>
                                                    <Text fontSize="xs" color="gray.400">{order.email}</Text>
                                                </Box>
                                            </Table.Cell>
                                            
                                            <Table.Cell p="3" color="gray.600">
                                                {new Date(order.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                            </Table.Cell>
                                            
                                            <Table.Cell p="3">
                                                <Box>
                                                    <Text fontWeight="bold" color="gray.800">${order.totalAmount.toFixed(2)}</Text>
                                                    <Text fontSize="10px" fontWeight="semibold" color={order.paymentStatus === 'Paid' ? 'green.500' : 'red.500'}>
                                                        {order.paymentStatus.toUpperCase()} • {order.paymentMethod}
                                                    </Text>
                                                </Box>
                                            </Table.Cell>
                                            
                                            <Table.Cell p="3">
                                                <OrderStatusSelect 
                                                    currentStatus={order.orderStatus} 
                                                    onChange={(newStatus) => handleStatusChange(order.id, newStatus)} 
                                                />
                                            </Table.Cell>
                                            
                                            <Table.Cell p="3" textAlign="right">
                                                <Button 
                                                    size="xs" 
                                                    variant="outline" 
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        detailsModal.onOpen();
                                                    }}
                                                >
                                                    <FiEye style={{ marginRight: '4px' }} /> View Details
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        </Box>

                        {/* Pagination Bar */}
                        <Box mt="6">
                            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                        </Box>
                    </Card>
                )}

                <Modal 
                    isOpen={detailsModal.open} 
                    onClose={detailsModal.onClose} 
                    title={`Order Details: ${selectedOrder?.id || ''}`}
                    size="md"
                >
                    <OrderDetails order={selectedOrder} />
                </Modal>
            </Box>
        </>
    )
}

export default OrderList