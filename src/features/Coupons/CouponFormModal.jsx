
import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, CustomSelect } from '../../components/common';

const discountTypeOptions = [
    { value: 'percentage', label: 'Percentage (%)' },
    { value: 'flat', label: 'Flat Amount' },
];

const CouponFormModal = ({ isOpen, onClose, onSave, couponToEdit }) => {
    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        minOrderAmount: '',
        maxDiscount: '',
        expiryDate: '',
        isActive: true,
    });

    useEffect(() => {
        if (couponToEdit) {
            setFormData(couponToEdit);
        } else {
            setFormData({
                code: '',
                discountType: 'percentage',
                discountValue: '',
                minOrderAmount: '',
                maxDiscount: '',
                expiryDate: '',
                isActive: true,
            });
        }
    }, [couponToEdit, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'code' ? value.toUpperCase().replace(/\s+/g, '') : value,
        }));
    };
    
    const handleSelectChange = (value) => {
        setFormData((prev) => ({ 
            ...prev, 
            discountType: value,
            discountValue: '' 
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.code || !formData.discountValue || !formData.expiryDate) {
            alert("Please fill all required fields");
            return;
        }

        if (Number(formData.discountValue) < 0 || 
            Number(formData.minOrderAmount) < 0 || 
            Number(formData.maxDiscount) < 0) {
            alert("Values cannot be negative!");
            return;
        }
    
        onSave({
            ...formData,
            discountValue: Number(formData.discountValue),
            minOrderAmount: formData.minOrderAmount ? Number(formData.minOrderAmount) : 0,
            maxDiscount: formData.discountType === 'percentage' && formData.maxDiscount ? Number(formData.maxDiscount) : null,
        });
        onClose();
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} title={couponToEdit ? "Edit Coupon" : "Create New Coupon"}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                    {/* Coupon Code */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Coupon Code *</label>
                        <Input 
                            name="code" 
                            value={formData.code} 
                            onChange={handleChange} 
                            placeholder="e.g. FESTIVE20" 
                            required 
                        />
                    </div>

                    {/* Discount Type */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Discount Type *</label>
                        <CustomSelect 
                            options={discountTypeOptions} 
                            value={formData.discountType} 
                            onValueChange={handleSelectChange} 
                        />
                    </div>

                    {/* Discount Value */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                            Discount Value ({formData.discountType === 'percentage' ? '%' : 'Flat'}) *
                        </label>
                        <Input 
                            type="number" 
                            name="discountValue" 
                            min="0" // মাইনাস হওয়া আটকাবে
                            value={formData.discountValue} 
                            onChange={handleChange} 
                            placeholder={formData.discountType === 'percentage' ? 'e.g. 20' : 'e.g. 150'} 
                            required 
                        />
                    </div>

                    {/* Minimum Order Amount */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Minimum Order Amount (Optional)</label>
                        <Input 
                            type="number" 
                            name="minOrderAmount" 
                            min="0" 
                            value={formData.minOrderAmount} 
                            onChange={handleChange} 
                            placeholder="e.g. 500" 
                        />
                    </div>

                    {/* Maximum Discount (Only for percentage type) */}
                    {formData.discountType === 'percentage' && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Maximum Discount Limit (Optional)</label>
                            <Input 
                                type="number" 
                                name="maxDiscount" 
                                min="0" 
                                value={formData.maxDiscount || ''} 
                                onChange={handleChange} 
                                placeholder="e.g. 200" 
                            />
                        </div>
                    )}

                    {/* Expiry Date */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Expiry Date *</label>
                        <Input 
                            type="date" 
                            name="expiryDate" 
                            value={formData.expiryDate} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="primary">Save Coupon</Button>
                    </div>

                </form>
            </Modal>
        </>
    );
};

export default CouponFormModal;