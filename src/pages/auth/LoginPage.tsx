import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack, Text, Flex } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useColorModeValue } from "../../components/ui/color-mode";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    //   const toast = useToast();
    const navigate = useNavigate();
    const { login } = useAuth();

    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const success = await login(email, password);
        setLoading(false);

        if (success) {
            // toast({
            //     title: 'Login Successful',
            //     description: 'Welcome back!',
            //     status: 'success',
            //     duration: 3000,
            //     isClosable: true,
            // });
            navigate('/app/inbox');
        } else {
            // toast({
            //     title: 'Login Failed',
            //     description: 'Invalid email or password.',
            //     status: 'error',
            //     duration: 3000,
            //     isClosable: true,
            // });
        }
    };

    return (
        <Flex minH="100vh" align="center" justify="center" bg={bgColor} color={textColor}>
        <Box p={8} maxW="md" borderWidth="1px" borderRadius="lg" shadow="lg" bg={cardBgColor} className="w-full">
            <VStack as="form" onSubmit={handleSubmit}>
            <Heading as="h2" size="xl" mb={4} className="text-brand-500 dark:text-brand-300">Login to ChatSaaS</Heading>
            <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                size="lg"
                borderRadius="md"
                className="w-full"
            />
            <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                size="lg"
                borderRadius="md"
                className="w-full"
            />
            <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                // isLoading={loading}
                loadingText="Logging in..."
                className="w-full"
                borderRadius="md"
            >
                Login
            </Button>
            <Text fontSize="md">
                Don't have an account? <Link to="/signup" className="text-brand-500 hover:underline">Sign up</Link>
            </Text>
            </VStack>
        </Box>
        </Flex>
    );
};

export default LoginPage;