import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack, Text, Flex } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useColorModeValue } from "../../components/ui/color-mode";

const SignupPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    // const toast = useToast();
    const navigate = useNavigate();
    const { signup } = useAuth();

    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const success = await signup(username, email, password);
        setLoading(false);

        if (success) {
            // toast({
            //     title: 'Account created.',
            //     description: "We've created your account for you.",
            //     status: 'success',
            //     duration: 3000,
            //     isClosable: true,
            // });
            navigate('/login');
        } else {
            // toast({
            //     title: 'Signup Failed',
            //     description: 'Something went wrong. Please try again.',
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
                    <Heading as="h2" size="xl" mb={4} className="text-brand-500 dark:text-brand-300">Sign Up for ChatSaaS</Heading>
                    <Input
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        size="lg"
                        borderRadius="md"
                        className="w-full"
                    />
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
                        loadingText="Signing up..."
                        className="w-full"
                        borderRadius="md"
                    >
                        Sign Up
                    </Button>
                    <Text fontSize="md">
                        Already have an account? <Link to="/login" className="text-brand-500 hover:underline">Login</Link>
                    </Text>
                </VStack>
            </Box>
        </Flex>
    );
};

export default SignupPage;