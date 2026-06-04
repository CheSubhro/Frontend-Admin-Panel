


import React from 'react';
import { Badge as ChakraBadge } from '@chakra-ui/react';

/**
 * @param {string} status - 'success', 'error', 'warning', 'info'
 * @param {string} children - Badge text
 */
const Badge = ({ status = 'info', children, ...props }) => {
    const colorSchemes = {
        success: 'green',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
    };

    return (
        <ChakraBadge
            colorScheme={colorSchemes[status] || 'gray'}
            variant="subtle"
            px={2}
            borderRadius="md"
            textTransform="capitalize"
            {...props}
            >
            {children}
        </ChakraBadge>
    );
};

export default Badge;