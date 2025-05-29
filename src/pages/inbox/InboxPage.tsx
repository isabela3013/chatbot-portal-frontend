// src/presentation/pages/InboxPage/InboxPage.tsx
import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, VStack, HStack, Input, Button, Heading, Spinner } from '@chakra-ui/react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import type { Conversation } from '@/entities/conversation/conversation';
import { useColorModeValue } from '../../components/ui/color-mode';
import type { Message } from '@/entities/conversation/message';

const InboxPage: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messageInput, setMessageInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const cardBgColor = useColorModeValue('white', 'gray.800');
    const customerBubbleBg = useColorModeValue('gray.200', 'gray.700');
    const agentBubbleBg = useColorModeValue('brand.500', 'brand.400');
    const agentBubbleText = useColorModeValue('white', 'gray.900');
    const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');

    const mockConversations: Conversation[] = [
        {
            id: 'conv1',
            customerName: 'Maria Rodriguez',
            channel: 'whatsapp',
            lastMessage: 'Sí, quiero pedir 2 de esos.',
            timestamp: '2025-05-28T10:00:00Z',
            unread: true,
            messages: [
                { sender: 'customer', text: 'Hola, ¿tienen disponibilidad de las flores rojas?', timestamp: '2025-05-28T09:55:00Z' },
                { sender: 'bot', text: '¡Hola! Sí, tenemos abundantes flores rojas. ¿Cuántas te gustaría?', timestamp: '2025-05-28T09:56:00Z' },
                { sender: 'customer', text: 'Sí, quiero pedir 2 de esos.', timestamp: '2025-05-28T10:00:00Z' },
                { sender: 'bot', text: 'Perfecto. ¿Podrías confirmarme tu dirección de envío y un número de contacto?', timestamp: '2025-05-28T10:01:00Z' },
            ]
        },
        {
            id: 'conv2',
            customerName: 'Carlos Gomez',
            channel: 'instagram',
            lastMessage: 'Gracias por la info!',
            timestamp: '2025-05-28T09:15:00Z',
            unread: false,
            messages: [
                { sender: 'customer', text: 'Hola, ¿cuáles son sus horarios de atención?', timestamp: '2025-05-28T09:10:00Z' },
                { sender: 'bot', text: 'Estamos abiertos de Lunes a Viernes de 9 AM a 6 PM, y Sábados de 10 AM a 2 PM.', timestamp: '2025-05-28T09:12:00Z' },
                { sender: 'customer', text: 'Gracias por la info!', timestamp: '2025-05-28T09:15:00Z' },
            ]
        },
        {
            id: 'conv3',
            customerName: 'Ana Lopez',
            channel: 'whatsapp',
            lastMessage: '¿El envío es gratis?',
            timestamp: '2025-05-27T18:30:00Z',
            unread: false,
            messages: [
                { sender: 'customer', text: 'Estoy interesada en el producto X. ¿El envío es gratis?', timestamp: '2025-05-27T18:28:00Z' },
                { sender: 'bot', text: 'El envío es gratis para compras superiores a $100.000 COP. Para montos menores, el costo es de $10.000 COP.', timestamp: '2025-05-27T18:30:00Z' },
            ]
        },
    ];

    useEffect(() => {
        setTimeout(() => {
        setConversations(mockConversations);
        setIsLoading(false);
            if (mockConversations.length > 0) {
                setSelectedConversation(mockConversations[0]);
            }
        }, 1000);
    }, []);

    const handleSendMessage = (): void => {
        if (!messageInput.trim() || !selectedConversation) return;

        const newMessage: Message = {
            sender: 'agent',
            text: messageInput,
            timestamp: new Date().toISOString(),
        };

        setSelectedConversation((prev) => {
        if (!prev) return null; // Should not happen
            return {
                ...prev,
                messages: [...prev.messages, newMessage],
            };
        });

        setMessageInput('');
    };

    if (isLoading) {
        return (
            <Flex justify="center" align="center" minH="50vh" color={textColor}>
                <Spinner size="xl" color="brand.500" />
            </Flex>
        );
    }

    return (
        <Flex h="full" direction={{ base: 'column', lg: 'row' }} className="gap-4">
            {/* Conversation List */}
            <Box
                w={{ base: 'full', lg: '300px' }}
                bg={cardBgColor}
                p="4"
                shadow="md"
                borderRadius="lg"
                className="flex-shrink-0 overflow-y-auto max-h-[80vh]"
                color={textColor}
            >
                <Heading size="md" mb="4">Conversations</Heading>
                <VStack align="stretch">
                    {conversations.map((conv) => (
                        <Flex
                            key={conv.id}
                            p="3"
                            bg={selectedConversation?.id === conv.id ? 'brand.50' : 'gray.50'}
                            borderRadius="md"
                            cursor="pointer"
                            _hover={{ bg: 'gray.100' }}
                            onClick={() => setSelectedConversation(conv)}
                            align="center"
                            className="cursor-pointer hover:bg-gray-100"
                        >
                            {conv.channel === 'whatsapp' ? <FaWhatsapp color="green.500" size="20px" className="mr-2" /> : <FaInstagram color="purple.500" size="20px" className="mr-2" />}
                            <Box>
                                <Text fontWeight="bold">{conv.customerName}</Text>
                                <Text fontSize="sm" color="gray.600">{conv.lastMessage}</Text>
                            </Box>
                            {conv.unread && (
                                <Box bg="red.500" borderRadius="full" boxSize="10px" ml="auto" className="w-2 h-2 rounded-full ml-auto bg-red-500" />
                            )}
                        </Flex>
                    ))}
                </VStack>
            </Box>

            {/* Chat Window */}
            <Flex flex="1" direction="column" bg={cardBgColor} p="4" shadow="md" borderRadius="lg" className="overflow-hidden" color={textColor}>
                {selectedConversation ? (
                <>
                    <Heading size="md" mb="4">{selectedConversation.customerName}</Heading>
                    <VStack flex="1" overflowY="auto" align="stretch" className="mb-4">
                    {selectedConversation.messages.map((msg, index) => (
                        <Flex
                            key={index}
                            justify={msg.sender === 'customer' ? 'flex-start' : 'flex-end'}
                        >
                            <Box
                                bg={msg.sender === 'customer' ? customerBubbleBg : agentBubbleBg}
                                color={msg.sender === 'customer' ? textColor : agentBubbleText}
                                p="2"
                                borderRadius="md"
                                maxW="70%"
                                className={`
                                    ${msg.sender === 'customer' ? 'rounded-tl-none self-start' : 'rounded-tr-none self-end'}
                                    rounded-lg
                                `}
                            >
                                <Text>{msg.text}</Text>
                                <Text fontSize="xs" textAlign="right" mt="1" color={msg.sender === 'customer' ? 'gray.500' : 'whiteAlpha.700'}>
                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                </Text>
                            </Box>
                        </Flex>
                    ))}
                    </VStack>
                    <HStack>
                        <Input
                            placeholder="Type your message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleSendMessage();
                            }}
                            className="flex-1"
                            borderRadius="md"
                        />
                        <Button onClick={handleSendMessage} colorScheme="brand" borderRadius="md">
                            Send
                        </Button>
                    </HStack>
                </>
                ) : (
                    <Flex justify="center" align="center" h="full">
                        <Text fontSize="lg" color="gray.500">Select a conversation to view messages</Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default InboxPage;