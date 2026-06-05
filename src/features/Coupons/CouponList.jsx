
import React, { useState } from 'react';
import { Card, Button, Badge, EmptyState, Pagination, Input, ConfirmModal } from '../../components/common';
import { FiPlus } from 'react-icons/fi';
import CouponFormModal from './CouponFormModal';
import initialCoupons from '../../assets/mock-data/couponsData.json';

const CouponList = () => {
    const [coupons, setCoupons] = useState(initialCoupons);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [couponIdToDelete, setCouponIdToDelete] = useState(null);

    const filteredCoupons = coupons.filter(coupon => 
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const isExpired = (dateString) => {
        const today = new Date();
        const expiry = new Date(dateString);
        return expiry < today;
    };

    const handleSaveCoupon = (formData) => {
        if (formData.id) {
            setCoupons((prev) =>
                prev.map((item) => (item.id === formData.id ? formData : item))
            );
        } else {
            const newCoupon = {
                ...formData,
                id: `cp-${Date.now()}`,
            };
            setCoupons((prev) => [newCoupon, ...prev]);
        }
        setSelectedCoupon(null);
    };

    const handleToggleStatus = (id) => {
        setCoupons((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isActive: !item.isActive } : item
            )
        );
    };

    return (
        <>
            <div className="page-layout" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Coupon & Discounts</h1>
                        <p style={{ color: '#666', margin: '5px 0 0 0' }}>Manage ecommerce marketing coupon codes and discounts</p>
                    </div>
                    <Button 
                        variant="solid" 
                        colorScheme="blue" 
                        onClick={() => { 
                            setSelectedCoupon(null); 
                            setIsFormOpen(true); 
                        }}
                    >
                        <FiPlus style={{ marginRight: '6px' }} /> Add New Coupon
                    </Button>
                </div>

                <Card>
                    <div className="coupon-list-container">
                        <div style={{ marginBottom: '20px' }}>
                            <Input 
                                placeholder="Search by coupon code..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                style={{ maxWidth: '300px' }}
                            />
                        </div>

                        {filteredCoupons.length === 0 ? (
                            <EmptyState message="No coupons found." />
                        ) : (
                            <>
                                <table className="custom-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                                            <th style={{ padding: '12px' }}>Code</th>
                                            <th>Discount</th>
                                            <th>Min. Order</th>
                                            <th>Expiry Date</th>
                                            <th>Status</th>
                                            <th style={{ textAlign: 'right', padding: '12px' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCoupons.map((coupon) => {
                                            const expired = isExpired(coupon.expiryDate);
                                            return (
                                                <tr key={coupon.id} style={{ borderBottom: '1px solid #eee' }}>
                                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{coupon.code}</td>
                                                    <td>
                                                        {coupon.discountType === 'percentage' 
                                                            ? `${coupon.discountValue}%` 
                                                            : `$${coupon.discountValue}`}
                                                    </td>
                                                    <td>${coupon.minOrderAmount || 0}</td>
                                                    <td>{coupon.expiryDate}</td>
                                                    <td>
                                                        {expired ? (
                                                            <Badge variant="danger">Expired</Badge>
                                                        ) : coupon.isActive ? (
                                                            <Badge variant="success">Active</Badge>
                                                        ) : (
                                                            <Badge variant="warning">Inactive</Badge>
                                                        )}
                                                    </td>
                                                    <td style={{ textAlign: 'right', padding: '12px' }}>
                                                        <Button 
                                                            variant="secondary" 
                                                            size="small" 
                                                            style={{ marginRight: '5px' }}
                                                            onClick={() => handleToggleStatus(coupon.id)}
                                                            disabled={expired}
                                                        >
                                                            {coupon.isActive ? 'Deactivate' : 'Activate'}
                                                        </Button>
                                                        
                                                        <Button 
                                                            variant="primary" 
                                                            size="small" 
                                                            style={{ marginRight: '5px' }} 
                                                            onClick={() => { setSelectedCoupon(coupon); setIsFormOpen(true); }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        
                                                        <Button 
                                                            variant="danger" 
                                                            size="small" 
                                                            onClick={() => { setCouponIdToDelete(coupon.id); setIsConfirmOpen(true); }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </Card>
            </div>

            <CouponFormModal 
                isOpen={isFormOpen} 
                onClose={() => { setIsFormOpen(false); setSelectedCoupon(null); }} 
                onSave={handleSaveCoupon}
                couponToEdit={selectedCoupon}
            />

            <ConfirmModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={() => {
                    setCoupons((prev) => prev.filter((item) => item.id !== couponIdToDelete));
                    setIsConfirmOpen(false);
                    setCouponIdToDelete(null);
                }}
                title="Delete Coupon"
                message="Are you sure you want to delete this coupon? This action cannot be undone."
            />
        </>
    );
};

export default CouponList;