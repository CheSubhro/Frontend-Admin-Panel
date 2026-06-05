
import React from 'react';
import { NativeSelect } from '@chakra-ui/react';

const UserRoleSelect = ({ currentRole, onChange }) => {

    const getRoleColor = (role) => {
        switch (role?.toLowerCase()) {
            case 'super admin':
                return { bg: 'red.50', color: 'red.700', borderColor: 'red.200' };
            case 'admin':
            case 'moderator':
                return { bg: 'blue.50', color: 'blue.700', borderColor: 'blue.200' };
            case 'vendor':
                return { bg: 'purple.50', color: 'purple.700', borderColor: 'purple.200' };
            default: // customer
                return { bg: 'gray.50', color: 'gray.700', borderColor: 'gray.200' };
        }
    };

    const colors = getRoleColor(currentRole);

    return (
        <>
            <NativeSelect.Root size="sm" maxW="150px">
                <NativeSelect.Field
                    value={currentRole}
                    onChange={(e) => onChange(e.target.value)}
                    bg={colors.bg}
                    color={colors.color}
                    borderColor={colors.borderColor}
                    fontWeight="semibold"
                    textTransform="capitalize"
                    _focus={{ borderColor: colors.color }}
                >
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                    <option value="super admin">Super Admin</option>
                </NativeSelect.Field>
            </NativeSelect.Root>
        </>
    )
}

export default UserRoleSelect