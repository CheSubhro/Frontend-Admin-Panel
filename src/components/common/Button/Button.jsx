
import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

/**
 * @param {string} variant - The visual style of the button ('solid', 'outline', 'ghost', 'link')
 * @param {string} colorScheme - The color palette of the button ('blue', 'red', 'green', etc.)
 * @param {boolean} isLoading - Controls the loading spinner state to block/indicate activity (true/false)
 * @param {any} leftIcon - An optional icon element to be displayed on the left side of the button text
 */
const Button = ({ 
    children, 
    variant = 'solid', 
    colorScheme = 'blue', 
    isLoading = false, 
    leftIcon, 
    ...props 
}) => {
    return (
        <ChakraButton
            variant={variant}
            colorScheme={colorScheme}
            isLoading={isLoading}
            leftIcon={leftIcon}
            // Passes down any standard HTML attributes or React props (e.g., onClick, type, disabled)
            {...props}
        >
            {children}
        </ChakraButton>
    );
};

export default Button;