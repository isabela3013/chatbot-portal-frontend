import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import type { PrivateRouteProps } from '@/entities/common/privateRoute';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return (
            <Flex justify="center" align="center" minH="100vh" direction="column">
                <Spinner size="xl" color="brand.500" />
                <Text mt={4}>Loading user session...</Text>
            </Flex>
        );
    }

    return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;