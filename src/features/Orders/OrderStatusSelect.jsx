
import React from 'react';
import { NativeSelect } from '@chakra-ui/react';

const OrderStatusSelect = ({ currentStatus, onChange }) => {

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return { bg: 'yellow.50', color: 'yellow.700', borderColor: 'yellow.200' };
            case 'Processing':
                return { bg: 'blue.50', color: 'blue.700', borderColor: 'blue.200' };
            case 'Shipped':
                return { bg: 'purple.50', color: 'purple.700', borderColor: 'purple.200' };
            case 'Delivered':
                return { bg: 'green.50', color: 'green.700', borderColor: 'green.200' };
            case 'Cancelled':
                return { bg: 'red.50', color: 'red.700', borderColor: 'red.200' };
            default:
                return { bg: 'gray.50', color: 'gray.700', borderColor: 'gray.200' };
        }
    };

    const colors = getStatusColor(currentStatus);


    return (
        <>
            <NativeSelect.Root size="sm" maxW="140px">
                <NativeSelect.Field
                    value={currentStatus}
                    onChange={(e) => onChange(e.target.value)}
                    bg={colors.bg}
                    color={colors.color}
                    borderColor={colors.borderColor}
                    fontWeight="medium"
                    _focus={{ borderColor: colors.color }}
                >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </NativeSelect.Field>
            </NativeSelect.Root>
        </>
    )
}

export default OrderStatusSelect