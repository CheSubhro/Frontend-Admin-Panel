
import React, { useState, useEffect } from 'react';
import { Box, Fieldset, Stack, Select, Flex } from '@chakra-ui/react';
import { Input, Button } from '../../components/common';

const ProductForm = ({ initialData, onSubmit, onClose }) => {

    // Form States
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Electronics');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [status, setStatus] = useState('Active');
    const [image, setImage] = useState('');

    // If Edit Mode, prepopulate the fields with initialData
    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setCategory(initialData.category);
            setPrice(initialData.price.toString());
            setStock(initialData.stock.toString());
            setStatus(initialData.status);
            setImage(initialData.image || '');
        }
    }, [initialData]);

    // Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic Validation
        if (!name || !price || !stock) return;

        const formData = {
            name,
            category,
            price: parseFloat(price),
            stock: parseInt(stock, 10),
            status,
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
                        {/* Product Name */}
                        <Input
                            label="Product Name"
                            placeholder="e.g., Sony WH-1000XM4"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <Flex gap="4">
                            {/* Category Select Option */}
                            <Box flex="1">
                                <label style={{ fontSize: '14px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>
                                    Category
                                </label>
                                <Select.Root 
                                    value={[category]} 
                                    onValueChange={(details) => setCategory(details.value[0])}
                                >
                                    <Select.Trigger>
                                        <Select.ValueText placeholder="Select Category" />
                                    </Select.Trigger>
                                    <Select.Content portal>
                                        <Select.Item item="Electronics">Electronics</Select.Item>
                                        <Select.Item item="Accessories">Accessories</Select.Item>
                                        <Select.Item item="Fashion">Fashion</Select.Item>
                                        <Select.Item item="Fitness">Fitness</Select.Item>
                                        <Select.Item item="Beauty">Beauty</Select.Item>
                                        <Select.Item item="Lifestyle">Lifestyle</Select.Item>
                                    </Select.Content>
                                </Select.Root>
                            </Box>

                            {/* Product Price */}
                            <Box flex="1">
                                <Input
                                    label="Price ($)"
                                    type="number"
                                    step="0.01"
                                    placeholder="99.99"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </Box>
                        </Flex>

                        <Flex gap="4">
                            {/* Product Stock */}
                            <Box flex="1">
                                <Input
                                    label="Stock Quantity"
                                    type="number"
                                    placeholder="50"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    required
                                />
                            </Box>

                            {/* Status Select Option */}
                            <Box flex="1">
                                <label style={{ fontSize: '14px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>
                                    Status
                                </label>
                                <Select.Root 
                                    value={[status]} 
                                    onValueChange={(details) => setStatus(details.value[0])}
                                >
                                    <Select.Trigger>
                                        <Select.ValueText placeholder="Select Status" />
                                    </Select.Trigger>
                                    <Select.Content portal>
                                        <Select.Item item="Active">Active</Select.Item>
                                        <Select.Item item="Inactive">Inactive</Select.Item>
                                    </Select.Content>
                                </Select.Root>
                            </Box>
                        </Flex>

                        {/* Product Image URL Input */}
                        <Input
                            label="Product Image URL"
                            placeholder="https://images.unsplash.com/... or leave blank"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />

                        {/* Action Buttons inside Form */}
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