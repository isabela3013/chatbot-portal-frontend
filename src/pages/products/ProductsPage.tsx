// src/presentation/pages/ProductsPage/ProductsPage.tsx
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, Spinner, Flex } from '@chakra-ui/react';
import type { Product } from '@/entities/product/product';
import { useColorModeValue } from '../../components/ui/color-mode';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const cardBgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');

    const mockProducts: Product[] = [
        {
            id: 'prod001',
            name: 'Ramo de Rosas Rojas',
            description: 'Hermoso ramo de 12 rosas rojas frescas, ideal para cualquier ocasión.',
            price: '50.000 COP',
            stock: 50,
            type: 'product'
        },
        {
            id: 'prod002',
            name: 'Caja de Chocolates Premium',
            description: 'Selección de 24 chocolates artesanales con rellenos variados.',
            price: '75.000 COP',
            stock: 20,
            type: 'product'
        },
        {
            id: 'prod003',
            name: 'Kit de Cuidado Facial',
            description: 'Incluye limpiador, tónico y crema hidratante para todo tipo de piel.',
            price: '120.000 COP',
            stock: 30,
            type: 'product'
        },
        {
            id: 'faq001',
            name: 'Horarios de Atención',
            description: 'Estamos abiertos de Lunes a Viernes de 9 AM a 6 PM, y Sábados de 10 AM a 2 PM.',
            type: 'FAQ'
        },
        {
            id: 'faq002',
            name: 'Política de Envíos',
            description: 'Envío gratis para compras superiores a $100.000 COP. Para montos menores, el costo es de $10.000 COP en Medellín.',
            type: 'FAQ'
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setProducts(mockProducts);
            setIsLoading(false);
        }, 700);
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
            <Heading size="lg" mb="6">Products & FAQs Management</Heading>
            {products.length === 0 ? (
                <Text>No products or FAQs configured yet.</Text>
            ) : (
                <VStack align="stretch">
                    {products.map((product) => (
                        <Box key={product.id} p={4} borderWidth="1px" borderRadius="md">
                            <Heading size="md">{product.name}</Heading>
                            <Text mt={2}>{product.description}</Text>
                            {product.price && <Text fontWeight="bold" mt={1}>Price: {product.price}</Text>}
                            {typeof product.stock === 'number' && <Text fontSize="sm" color="gray.500">Stock: {product.stock}</Text>}
                        </Box>
                    ))}
                    <Text mt={4} fontSize="lg" fontWeight="semibold">
                        (Future: Interface for adding/editing products and FAQs, possibly integrating Google Sheets here)
                    </Text>
                </VStack>
            )}
        </Box>
    );
};

export default ProductsPage;