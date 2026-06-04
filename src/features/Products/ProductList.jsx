
import React, { useState } from 'react';
import { 
    Box, 
    Table, 
    Heading, 
    Flex, 
    HStack,
    Text,
    Image,
    useDisclosure
} from '@chakra-ui/react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

import mockProducts from '../../assets/mock-data/products.json'; // Mock Data
import { Card, Button, Input, Pagination, Badge, Modal, ConfirmModal, EmptyState } from '../../components/common'; // Common Components
import { usePagination } from '../../hooks/usePagination'; // Custom Hooks
import ProductForm from './ProductForm';

const ProductList = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState(mockProducts);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const formModal = useDisclosure();
    const deleteModal = useDisclosure();

    // Advanced Search Logic (Searches by Name, SKU, Category, and Tags)
    const filteredProducts = products.filter(product => {
        const term = searchTerm.toLowerCase();
        return (
            product.name.toLowerCase().includes(term) ||
            (product.sku && product.sku.toLowerCase().includes(term)) ||
            product.category.toLowerCase().includes(term) ||
            (product.tags && product.tags.some(tag => tag.toLowerCase().includes(term)))
        );
    });

    // Client-side pagination (Showing 10 products per page)
    const { 
        currentPage, 
        totalPages, 
        currentItems: currentProducts, 
        handlePageChange,
        resetPage
    } = usePagination(filteredProducts, 10);

    // Create or Edit Handler
    const handleFormSubmit = (formData) => {
        if (selectedProduct) {
            // Edit Mode
            setProducts(prev => 
                prev.map(prod => prod.id === selectedProduct.id ? { ...prod, ...formData } : prod)
            );
        } else {
            // Create Mode
            const newProduct = {
                id: `prod-${Date.now()}`,
                createdAt: new Date().toISOString(), // System managed fields
                ...formData
            };
            setProducts(prev => [newProduct, ...prev]);
        }
        formModal.onClose();
    };

    // Delete Handler
    const handleDeleteConfirm = () => {
        setProducts(prev => prev.filter(prod => prod.id !== deleteId));
        deleteModal.onClose();
        setDeleteId(null);
    };


    return (
        <>
            <Box spaceY="6">
                <Flex justify="space-between" align="center" mb="6">
                    <Box>
                        <Heading size="lg" fontWeight="bold" color="slate.800">Products Store</Heading>
                        <Text color="gray.500" fontSize="sm">Manage your inventory, prices, and stock updates.</Text>
                    </Box>
                    <Button 
                        variant="solid" 
                        colorScheme="blue" 
                        onClick={() => {
                            setSelectedProduct(null); 
                            formModal.onOpen();
                        }}
                    >
                        <FiPlus style={{ marginRight: '6px' }} /> Add New Product
                    </Button>
                </Flex>

                {/* Search Filters Card */}
                <Card p="4" mb="6">
                    <HStack maxW="md">
                        <Input 
                            placeholder="Search by name, SKU, category, or tags..." 
                            value={searchTerm}
                            mb="0"
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                resetPage(); 
                            }}
                        />
                    </HStack>
                </Card>

                {/* Main Content (Table or Empty State) */}
                {filteredProducts.length === 0 ? (
                    <EmptyState 
                        title="No Products Found" 
                        message="We couldn't find any products matching your search term. Try adding a new product!" 
                    />
                ) : (
                    <Card p="6">
                        <Box overflowX="auto">
                            <Table.Root interactive size="sm">
                                <Table.Header>
                                    <Table.Row bg="gray.50" h="10">
                                        <Table.ColumnHeader p="3" width="80px">Image</Table.ColumnHeader>
                                        <Table.ColumnHeader p="3">Product Info</Table.ColumnHeader>
                                        <Table.ColumnHeader p="3">Category</Table.ColumnHeader>
                                        <Table.ColumnHeader p="3">Price</Table.ColumnHeader>
                                        <Table.ColumnHeader p="3">Stock</Table.ColumnHeader>
                                        <Table.ColumnHeader p="3">Status</Table.ColumnHeader>
                                        <Table.ColumnHeader p="3" textAlign="right">Actions</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {currentProducts.map((product) => (
                                        <Table.Row key={product.id} h="16">
                                            {/* 🖼️ Product Image Render */}
                                            <Table.Cell p="3">
                                                <Image 
                                                    src={product.image} 
                                                    alt={product.name} 
                                                    boxSize="45px" 
                                                    objectFit="cover" 
                                                    borderRadius="md"
                                                    fallbackSrc="https://via.placeholder.com/45"
                                                />
                                            </Table.Cell>
                                            
                                            {/* 📦 Product Info (Name & SKU) */}
                                            <Table.Cell p="3">
                                                <Box>
                                                    <Text fontWeight="medium" lineClamp={1}>{product.name}</Text>
                                                    {product.sku && (
                                                        <Text fontSize="xs" color="gray.400" fontFamily="mono">
                                                            {product.sku}
                                                        </Text>
                                                    )}
                                                </Box>
                                            </Table.Cell>
                                            
                                            <Table.Cell p="3" color="gray.600">{product.category}</Table.Cell>
                                            
                                            {/* 💰 Price Display (with compareAtPrice markdown) */}
                                            <Table.Cell p="3">
                                                <Box>
                                                    <Text fontWeight="semibold" color="gray.800">
                                                        ${product.price.toFixed(2)}
                                                    </Text>
                                                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                                                        <Text fontSize="xs" color="gray.400" textDecoration="line-through">
                                                            ${product.compareAtPrice.toFixed(2)}
                                                        </Text>
                                                    )}
                                                </Box>
                                            </Table.Cell>
                                            
                                            <Table.Cell p="3">
                                                <Text color={product.stock === 0 ? "red.500" : "gray.700"}>
                                                    {product.stock === 0 ? "Out of Stock" : `${product.stock} units`}
                                                </Text>
                                            </Table.Cell>
                                            
                                            <Table.Cell p="3">
                                                <Badge status={product.status === 'Active' ? 'success' : 'error'}>
                                                    {product.status}
                                                </Badge>
                                            </Table.Cell>
                                            
                                            <Table.Cell p="3" textAlign="right">
                                                <HStack gap="2" justify="flex-end">
                                                    <Button 
                                                        size="xs" 
                                                        variant="outline" 
                                                        onClick={() => {
                                                            setSelectedProduct(product); 
                                                            formModal.onOpen();
                                                        }}
                                                    >
                                                        <FiEdit2 />
                                                    </Button>
                                                    <Button 
                                                        size="xs" 
                                                        variant="ghost" 
                                                        colorScheme="red"
                                                        onClick={() => {
                                                            setDeleteId(product.id);
                                                            deleteModal.onOpen();
                                                        }}
                                                    >
                                                        <FiTrash2 />
                                                    </Button>
                                                </HStack>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        </Box>

                        {/* Pagination Service */}
                        <Box mt="6">
                            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                        </Box>
                    </Card>
                )}

                {/* Product Add/Edit Modal */}
                <Modal 
                    isOpen={formModal.open} 
                    onClose={formModal.onClose} 
                    title={selectedProduct ? "Edit Product" : "Add New Product"}
                >
                    <ProductForm 
                        initialData={selectedProduct} 
                        onSubmit={handleFormSubmit} 
                        onClose={formModal.onClose} 
                    />
                </Modal>

                {/* Product Delete Confirm Modal */}
                <ConfirmModal
                    isOpen={deleteModal.open}
                    onClose={deleteModal.onClose}
                    onConfirm={handleDeleteConfirm}
                    title="Delete Product"
                    message={`Are you sure you want to delete this product? This will permanently remove it from the store.`}
                />
            </Box>
        </>
    )
}

export default ProductList