// src/presentation/pages/OrdersPage/OrdersPage.tsx
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Spinner, Flex } from '@chakra-ui/react';
import type { Order } from '@/entities/order/order';
import { useColorModeValue } from '../../components/ui/color-mode';

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const cardBgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');

    const mockPendingOrders: Order[] = [
        {
            id: 'ORD001',
            customerName: 'Maria Rodriguez',
            contact: '+573001234567',
            product: 'Ramo de Rosas Rojas',
            quantity: 2,
            totalPrice: '100.000 COP',
            deliveryAddress: 'Calle 10 #20-30, El Poblado, Medellín',
            timestamp: '2025-05-28T10:05:00Z',
            status: 'pending'
        },
        {
            id: 'ORD002',
            customerName: 'Pedro Sanchez',
            contact: '+573109876543',
            product: 'Caja de Chocolates Premium',
            quantity: 1,
            totalPrice: '75.000 COP',
            deliveryAddress: 'Carrera 45 #50-15, Laureles, Medellín',
            timestamp: '2025-05-27T16:20:00Z',
            status: 'pending'
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setOrders(mockPendingOrders);
            setIsLoading(false);
        }, 800);
    }, []);

    if (isLoading) {
        return (
            <Flex justify="center" align="center" minH="50vh" color={textColor}>
                <Spinner size="xl" color="brand.500" />
            </Flex>
        );
    }

    return (
        <Box p="4" bg={cardBgColor} shadow="md" borderRadius="lg" color={textColor}>
            <Heading size="lg" mb="6">Pending Orders</Heading>
            {orders.length === 0 ? (
                <Text>No pending orders found.</Text>
            ) : (
                <div></div>
                // <Table variant="simple" size="md">
                //     <Thead>
                //         <Tr>
                //         <Th>Order ID</Th>
                //         <Th>Customer</Th>
                //         <Th>Product</Th>
                //         <Th isNumeric>Quantity</Th>
                //         <Th>Total Price</Th>
                //         <Th>Status</Th>
                //         <Th>Timestamp</Th>
                //         </Tr>
                //     </Thead>
                //     <Tbody>
                //         {orders.map((order) => (
                //         <Tr key={order.id}>
                //             <Td>{order.id}</Td>
                //             <Td>{order.customerName} ({order.contact})</Td>
                //             <Td>{order.product}</Td>
                //             <Td isNumeric>{order.quantity}</Td>
                //             <Td>{order.totalPrice}</Td>
                //             <Td>
                //             <Tag colorScheme={order.status === 'pending' ? 'orange' : 'green'}>
                //                 {order.status.toUpperCase()}
                //             </Tag>
                //             </Td>
                //             <Td>{new Date(order.timestamp).toLocaleString()}</Td>
                //         </Tr>
                //         ))}
                //     </Tbody>
                // </Table>
            )}
        </Box>
    );
};

export default OrdersPage;