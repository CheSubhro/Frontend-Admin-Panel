
import React from 'react';
import { Flex, Text, Link, HStack } from '@chakra-ui/react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Flex
            direction={{ base: "column", sm: "row" }}
            w="100%"
            px={{ base: "4", md: "8" }}
            py="2"
            align="center"
            justify="space-between"
            fontSize="xs"
            color="gray.400"
        >
        <Text textAlign={{ base: "center", sm: "left" }} mb={{ base: "2", sm: "0" }}>
            &copy; {currentYear} <strong>BlogAdmin Panel</strong>. All rights reserved.
        </Text>

        <HStack spaceX="5" justify="center">
            <Link href="#" _hover={{ color: "blue.500", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="#" _hover={{ color: "blue.500", textDecoration: "none" }}>Terms of Service</Link>
            <Link href="#" _hover={{ color: "blue.500", textDecoration: "none" }}>Support</Link>
        </HStack>
        </Flex>
    );
};

export default Footer;