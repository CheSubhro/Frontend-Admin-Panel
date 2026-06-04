
import React, { useState, useEffect } from 'react';
import { Box, Fieldset, Stack, Flex, Textarea } from '@chakra-ui/react';
import { Input, Button, CustomSelect } from '../../components/common';

const ProductForm = ({ initialData, onSubmit, onClose }) => {

    // Form States
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [compareAtPrice, setCompareAtPrice] = useState('');
    const [stock, setStock] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const categoryOptions = ['Electronics', 'Accessories', 'Fashion', 'Fitness', 'Beauty', 'Lifestyle'];
    const statusOptions = ['Active', 'Inactive'];

    // If Edit Mode, prepopulate the fields with initialData
    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setSku(initialData.sku || '');
            setCategory(initialData.category || 'Electronics');
            setPrice(initialData.price ? initialData.price.toString() : '');
            setCompareAtPrice(initialData.compareAtPrice ? initialData.compareAtPrice.toString() : '');
            setStock(initialData.stock ? initialData.stock.toString() : '');
            setStatus(initialData.status || 'Active');
            setImage(initialData.image || '');
            setDescription(initialData.description || '');
            setTags(initialData.tags ? initialData.tags.join(', ') : '');
        }
    }, [initialData]);

    // Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic Validation
        if (!name || !price || !stock || !category || !status) return;

        // Process tags string into an array of trimmed lowercase strings
        const tagsArray = tags
            ? tags.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag !== '')
            : [];

        const formData = {
            name,
            sku: sku.trim() || `SKU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`, // Auto SKU if left blank
            category,
            price: parseFloat(price),
            compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
            stock: parseInt(stock, 10),
            status,
            description: description.trim(),
            tags: tagsArray,
            // If user leaves image blank, provide a clean default placeholder
            image: image.trim() || 'https://via.placeholder.com/500?text=No+Image'
        };

        onSubmit(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Fieldset.Root variant="padded">
                    <Stack gap="4">
                        <Flex gap="4">
                            <Box flex="2">
                                <Input
                                    label="Product Name"
                                    placeholder="e.g., Wireless Over-Ear Headphones"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Box>
                            <Box flex="1">
                                <Input
                                    label="SKU Code"
                                    placeholder="e.g., ELE-HDP-001"
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                />
                            </Box>
                        </Flex>

                        <Flex gap="4">
                            <CustomSelect 
                                label="Category"
                                value={category}
                                onValueChange={setCategory}
                                options={categoryOptions}
                                placeholder="Select Category"
                            />

                            <CustomSelect 
                                label="Status"
                                value={status}
                                onValueChange={setStatus}
                                options={statusOptions}
                                placeholder="Select Status"
                            />
                        </Flex>

                        <Flex gap="4">
                            <Box flex="1">
                                <Input
                                    label="Sale Price ($)"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="129.99"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </Box>
                            <Box flex="1">
                                <Input
                                    label="Regular Price ($)"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="159.99"
                                    value={compareAtPrice}
                                    onChange={(e) => setCompareAtPrice(e.target.value)}
                                />
                            </Box>
                            <Box flex="1">
                                <Input
                                    label="Stock Quantity"
                                    type="number"
                                    min="0"
                                    placeholder="45"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    required
                                />
                            </Box>
                        </Flex>

                        <Box>
                        <label style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
                            Description
                        </label>
                            <Textarea
                                placeholder="Enter rich product details and specifications..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                size="sm"
                                borderRadius="md"
                                focusBorderColor="blue.500"
                            />
                        </Box>

                        <Input
                            label="Tags (Comma separated)"
                            placeholder="e.g., audio, headphones, wireless"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />

                        <Input
                            label="Product Image URL"
                            placeholder="https://images.unsplash.com/... or leave blank"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />

                        <Flex justify="flex-end" gap="3" mt="4">
                            <Button variant="outline" onClick={onClose} type="button">
                                Cancel
                            </Button>
                            <Button variant="solid" colorScheme="blue" type="submit">
                                {initialData ? "Update Product" : "Add Product"}
                            </Button>
                        </Flex>
                    </Stack>
                </Fieldset.Root>
            </form>
        </>
    )
}

export default ProductForm