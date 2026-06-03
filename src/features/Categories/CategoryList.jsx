
import React, { useState } from 'react';
import { 
    Box, 
    Table, 
    Heading, 
    Flex, 
    HStack,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import mockCategories from '../../assets/mock-data/categories.json'; // Mock Data
import { Card, Button, Input, Pagination, Badge, Modal, ConfirmModal } from '../../components/common'; // Common Components
import { usePagination } from '../../hooks/usePagination'; // Custom Hooks
import CategoryForm from './CategoryForm'

const CategoryList = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState(mockCategories);
    const [selectedCategory, setSelectedCategory] = useState(null); // For Edit
    const [deleteId, setDeleteId] = useState(null); // For Delete

    const formModal = useDisclosure();
    const deleteModal = useDisclosure();

    // Search Filter Logic
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle client-side pagination via custom hook
    const { 
        currentPage, 
        totalPages, 
        currentItems: currentCategories, // Rename for local context
        handlePageChange,
        resetPage
    } = usePagination(filteredCategories, 4);

    // Create or Edit Handler
    const handleFormSubmit = (formData) => {
        if (selectedCategory) {
            // Edit Mode
            setCategories(prev => 
                prev.map(cat => cat.id === selectedCategory.id ? { ...cat, ...formData } : cat)
            );
        } else {
            // Create Mode
            const newCategory = {
                id: `cat-${Date.now()}`,
                count: 0,
                ...formData
            };
            setCategories(prev => [newCategory, ...prev]);
        }
        formModal.onClose();
    };

    // Delete Handler
    const handleDeleteConfirm = () => {
        setCategories(prev => prev.filter(cat => cat.id !== deleteId));
        deleteModal.onClose();
        setDeleteId(null);
    };

    return (
        <>
            <Box spaceY="6">
                <Flex justify="space-between" align="center" mb="6">
                    <Box>
                        <Heading size="lg" fontWeight="bold" color="slate.800">Blog Categories</Heading>
                        <Text color="gray.500" fontSize="sm">Manage and organize your blog post domains.</Text>
                    </Box>
                    <Button 
                        variant="solid" 
                        colorScheme="blue" 
                        onClick={() => {
                            setSelectedCategory(null); 
                            formModal.onOpen();
                        }}
                    >
                        <FiPlus style={{ marginRight: '6px' }} /> Add New Category
                    </Button>
                </Flex>

                {/* Search Bar */}
                <Card p="4" mb="6">
                    <HStack maxW="md">
                        <Input 
                            placeholder="Search categories..." 
                            value={searchTerm}
                            mb="0"
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                resetPage(); 
                            }}
                        />
                    </HStack>
                </Card>

                {/* Table Card */}
                <Card p="6">
                    <Box overflowX="auto">
                        <Table.Root interactive size="sm">
                            <Table.Header>
                                <Table.Row bg="gray.50" h="10">
                                    <Table.ColumnHeader p="3">Category Name</Table.ColumnHeader>
                                    <Table.ColumnHeader p="3">Slug</Table.ColumnHeader>
                                    <Table.ColumnHeader p="3">Status</Table.ColumnHeader>
                                    <Table.ColumnHeader p="3" textAlign="right">Actions</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {currentCategories.map((category) => (
                                    <Table.Row key={category.id} h="14">
                                        <Table.Cell p="3" fontWeight="medium">{category.name}</Table.Cell>
                                        <Table.Cell p="3" color="gray.500">/{category.slug}</Table.Cell>
                                        <Table.Cell p="3">
                                            <Badge status={category.status === 'Active' ? 'success' : 'error'}>
                                                {category.status}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell p="3" textAlign="right">
                                            <HStack gap="2" justify="flex-end">
                                                <Button 
                                                    size="xs" 
                                                    variant="outline" 
                                                    onClick={() => {
                                                        setSelectedCategory(category); 
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
                                                        setDeleteId(category.id);
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

                    {/* Pagination */}
                    <Box mt="6">
                        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                    </Box>
                </Card>

                <Modal 
                    isOpen={formModal.open} 
                    onClose={formModal.onClose} 
                    title={selectedCategory ? "Edit Category" : "Create New Category"}
                >
                    <CategoryForm 
                        initialData={selectedCategory} 
                        onSubmit={handleFormSubmit} 
                        onClose={formModal.onClose} 
                    />
                </Modal>

                <ConfirmModal
                    isOpen={deleteModal.open}
                    onClose={deleteModal.onClose}
                    onConfirm={handleDeleteConfirm}
                    title="Delete Category"
                    message="Are you sure you want to delete this category? This action cannot be undone."
                />
            </Box>
        </>
    )
}

export default CategoryList