

import React, { useState,useRef } from 'react';
import { 
    Box, 
    Table, 
    Heading, 
    Flex, 
    HStack,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import { FiPlus, FiEdit2, FiTrash2, FiUpload } from 'react-icons/fi';
import mockCategories from '../../assets/mock-data/categories.json'; // Mock Data
import { Card, Button, Input, Pagination, Badge, Modal, ConfirmModal } from '../../components/common'; // Common Components
import { usePagination } from '../../hooks/usePagination'; // Custom Hooks
import CategoryForm from './CategoryForm'
import * as XLSX from 'xlsx'; // SheetJS Library Import

const CategoryList = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState(mockCategories);
    const [selectedCategory, setSelectedCategory] = useState(null); // For Edit
    const [deleteId, setDeleteId] = useState(null); // For Delete

    const formModal = useDisclosure();
    const deleteModal = useDisclosure();

    const fileInputRef = useRef(null); // For Excel input

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

    // Excel File Handler
    const handleExcelImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0]; 
                const ws = wb.Sheets[wsname];
                const rawData = XLSX.utils.sheet_to_json(ws); 

                let skipCount = 0; 
                const importedCategories = [];

                rawData.forEach((item, index) => {
                    const name = (item.name || item.Name || 'Unnamed Category').trim();
                    const slug = (item.slug || item.Slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')).trim();

                    const isDuplicate = categories.some(
                        cat => cat.name.toLowerCase() === name.toLowerCase() || 
                               cat.slug.toLowerCase() === slug.toLowerCase()
                    );

                    if (isDuplicate) {
                        skipCount++; 
                    } else {
                        importedCategories.push({
                            id: `cat-excel-${Date.now()}-${index}`,
                            name: name,
                            slug: slug,
                            description: item.description || item.Description || '',
                            count: parseInt(item.count || item.Count, 10) || 0,
                            status: (item.status || item.Status) === 'Inactive' ? 'Inactive' : 'Active',
                            createdAt: item.createdAt || item.CreatedAt || new Date().toISOString().split('T')[0]
                    });
                    }
                });

                if (importedCategories.length === 0) {
                    if (skipCount > 0) {
                        alert("All categories in this Excel file already exist! No new data was added.");
                    } else {
                        alert("No valid data found in the Excel file.");
                    }
                    return;
                }

                setCategories(prev => [...importedCategories, ...prev]);
                resetPage(); 

                if (skipCount > 0) {
                    alert(`${importedCategories.length} new categories imported! (${skipCount} duplicates were skipped).`);
                } else {
                    alert(`${importedCategories.length} categories imported successfully!`);
                }

            } catch (error) {
                console.error("Excel Parsing Error:", error);
                alert("Failed to parse Excel file. Please ensure the file format is correct.");
            } finally {
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        };

        reader.readAsBinaryString(file);
    };

    

    return (
        <>
            <Box spaceY="6">
                <Flex justify="space-between" align="center" mb="6">
                    <Box>
                        <Heading size="lg" fontWeight="bold" color="slate.800">Blog Categories</Heading>
                        <Text color="gray.500" fontSize="sm">Manage and organize your blog post domains.</Text>
                    </Box>
                    <HStack gap="3">
                        <input 
                            type="file"
                            accept=".xlsx, .xls"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleExcelImport}
                        />
                        {/* Excel Import Button */}
                        <Button 
                            variant="outline" 
                            colorScheme="teal" 
                            onClick={() => fileInputRef.current.click()}
                        >
                            <FiUpload style={{ marginRight: '6px' }} /> Import Excel
                        </Button>

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
                    </HStack>
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