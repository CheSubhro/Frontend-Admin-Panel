
import React, { useState, useEffect } from 'react';
import { VStack, HStack, Field } from '@chakra-ui/react';
import { Button, Input } from '../../components/common';

const CategoryForm = ({ initialData, onSubmit, onClose }) => {

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        status: 'Active'
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => {
            const updated = { ...prev, [name]: value };
            
            // Auto-generate clean URL slug from name during creation
            if (name === 'name' && !initialData) {
                updated.slug = value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');
            }
            
            return updated;
        });

        // Clear dynamic field error on user keystroke
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Category name is required';
        if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        onSubmit(formData);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <VStack gap="4" align="stretch">
                    {/* Category Name Input */}
                    <Input
                        label="Category Name"
                        name="name"
                        placeholder="e.g., Artificial Intelligence"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        mb="0"
                    />

                    {/* Slug Input (Auto-generated but editable) */}
                    <Input
                        label="Slug (URL Friendly)"
                        name="slug"
                        placeholder="e.g., artificial-intelligence"
                        value={formData.slug}
                        onChange={handleChange}
                        error={errors.slug}
                        mb="0"
                    />

                    {/* Description Input */}
                    <Input
                        label="Description (Optional)"
                        name="description"
                        placeholder="Briefly describe this category..."
                        value={formData.description}
                        onChange={handleChange}
                        mb="0"
                    />

                    {/* Action Buttons */}
                    <HStack justify="flex-end" gap="3" mt="4">
                        <Button variant="outline" colorScheme="gray" onClick={onClose} type="button">
                            Cancel
                        </Button>
                        <Button variant="solid" colorScheme="blue" type="submit">
                            {initialData ? 'Update Category' : 'Save Category'}
                        </Button>
                    </HStack>
                </VStack>
            </form>
        </>
    )
}

export default CategoryForm