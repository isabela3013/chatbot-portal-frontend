// src/presentation/components/Layout/Layout.tsx
import React, { type ReactNode } from 'react';
import { Box, Flex, Button, Text, VStack, Spacer, IconButton } from '@chakra-ui/react';
import { FaWhatsapp, FaInstagram, FaRegListAlt, FaBox, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useColorMode } from '../ui/color-mode';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { isLoggedIn, logout } = useAuth();
    const { toggleColorMode, colorMode } = useColorMode();
    const location = useLocation();

    const navItems = [
        { name: 'Unified Inbox', icon: FaWhatsapp, path: '/app/inbox' },
        { name: 'Pending Orders', icon: FaRegListAlt, path: '/app/orders' },
        { name: 'Products/FAQs', icon: FaBox, path: '/app/products' },
    ];

    const goTo = (path: string) => {
        Navigate({ to: path });
    }

    // The Layout component is only rendered if the route is protected AND the user is logged in
    // So, no explicit isLoggedIn check here for direct children rendering.
    // The <Outlet /> in App.tsx ensures the correct child page is rendered.

    return (
        <Flex direction={{ base: 'column', md: 'row' }} minH="100vh" className="bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <Box
                bg={colorMode === 'light' ? 'white' : 'gray.800'}
                w={{ base: 'full', md: '250px' }}
                p="4"
                shadow="md"
                borderRight={{ md: '1px' }}
                borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
                className="flex-shrink-0"
            >
                <VStack align="stretch">
                <Text fontSize="2xl" fontWeight="bold" mb="4" className="text-brand-500 dark:text-brand-300">
                    ChatSaaS
                </Text>

                {navItems.map((item) => (
                    <Button
                        key={item.name}
                        as={Link}
                        onClick={() => goTo(item.path)}
                        variant={location.pathname.startsWith(item.path) ? 'solid' : 'ghost'}
                        colorScheme={location.pathname.startsWith(item.path) ? 'brand' : 'gray'}
                        justifyContent="flex-start"
                        py="6"
                        className="hover:shadow-md"
                    >
                        <item.icon />
                        <a href={item.path}>
                            {item.name}
                        </a>
                    </Button>
                ))}
                <Spacer />
                <Button
                    onClick={logout}
                    // leftIcon={<FaSignOutAlt />}
                    variant="ghost"
                    colorScheme="red"
                    justifyContent="flex-start"
                >
                    <FaSignOutAlt />
                    Logout
                </Button>
                <IconButton
                    aria-label="Toggle dark mode"
                    // icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                    onClick={toggleColorMode}
                    variant="ghost"
                    alignSelf="flex-end"
                >
                    {colorMode === 'light' ? <FaMoon /> : <FaSun />}
                </IconButton>
                </VStack>
            </Box>

            {/* Main Content Area */}
            <Box flex="1" p="6" className="overflow-auto">
                {children}
            </Box>
        </Flex>
    );
};

export default Layout;