import { useColorModeValue } from "../../components/ui/color-mode";
import { Text, Box, Button, Container, Heading, VStack, Link, SimpleGrid, Stack } from "@chakra-ui/react";
import TopMenu from "./components/TopMenu";

const LandingPage: React.FC = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      bg={bgColor}
      color={textColor}
      minH="100vh"
    >
      
      {/* Navbar Menu */}
      <TopMenu />

      {/* Hero Section */}
      <Box
        id="home"
        minH='100vh'
        display='flex'
        alignItems='center'
      >
        <Container maxW="6xl">
          <VStack textAlign="center">
            {/* Hero Section */}
            <VStack gap={4}>
              <Heading size="2xl">ChatSaaS: Your Unified Customer Hub</Heading>
              <Text fontSize="xl" maxW="2xl">
                Streamline customer conversations from WhatsApp & Instagram, automate FAQs with AI, and manage orders effortlessly.
              </Text>
              <Stack
                direction={{ base: "column", sm: "row" }}
                gap={4}
                mt={4}
              >
                <Button colorScheme="brand">Get Started Free</Button>
                <Button variant="outline" colorScheme="brand">Login</Button>
              </Stack>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" py={20}>
        <Container maxW="6xl" textAlign="center">
          <Heading size="xl" mb={6}>Why Choose ChatSaaS?</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            <Box>
              <Heading size="md" mb={2}>Unified Inbox</Heading>
              <Text>Combine WhatsApp & Instagram chats in one smart interface.</Text>
            </Box>
            <Box>
              <Heading size="md" mb={2}>AI Automation</Heading>
              <Text>Answer FAQs automatically and boost support productivity.</Text>
            </Box>
            <Box>
              <Heading size="md" mb={2}>Smart Orders</Heading>
              <Text>Track and manage orders without switching tools.</Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>Unified Inbox</Heading>
              <Text>Combine WhatsApp & Instagram chats in one smart interface.</Text>
            </Box>
            <Box>
              <Heading size="md" mb={2}>AI Automation</Heading>
              <Text>Answer FAQs automatically and boost support productivity.</Text>
            </Box>
            <Box>
              <Heading size="md" mb={2}>Smart Orders</Heading>
              <Text>Track and manage orders without switching tools.</Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
      
      {/* Pricing Section */}
      <Box id="pricing" w="full" bg={cardBg} p={8} borderRadius="lg" boxShadow="xl">
        <Container maxW="6xl">
          <VStack textAlign="center">
            <Heading size="lg" mb={6}>Pricing</Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                <Box p={6} borderWidth="1px" borderRadius="lg" borderColor={cardBorder}>
                  <Text fontWeight="bold" fontSize="lg">Basic Plan</Text>
                  <Text fontSize="2xl" fontWeight="bold">$49/month</Text>
                  <Text mt={2} fontSize="sm" color="gray.600">500 conversations, 1 channel, basic AI</Text>
                </Box>
                <Box p={6} borderWidth="1px" borderRadius="lg" borderColor={cardBorder}>
                  <Text fontWeight="bold" fontSize="lg">Pro Plan</Text>
                  <Text fontSize="2xl" fontWeight="bold">$149/month</Text>
                  <Text mt={2} fontSize="sm" color="gray.600">5,000 conversations, 2 channels, advanced AI, order tracking</Text>
                </Box>
                <Box p={6} borderWidth="1px" borderRadius="lg" borderColor={cardBorder}>
                  <Text fontWeight="bold" fontSize="lg">Enterprise</Text>
                  <Text fontSize="2xl" fontWeight="bold">Custom</Text>
                  <Text mt={2} fontSize="sm" color="gray.600">Unlimited, custom integrations, dedicated support</Text>
                </Box>
              </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box id="testimonials" py={20} bg={useColorModeValue("gray.100", "gray.800")}>
        <Container maxW="4xl" textAlign="center">
          <Heading size="xl" mb={6}>What Our Customers Say</Heading>
          <Stack gap={8}>
            <Box>
              <Text fontStyle="italic">“ChatSaaS changed the game for our support team. Orders are smoother than ever.”</Text>
              <Text fontWeight="bold" mt={2}>— Ana, CEO at TrendyStore</Text>
            </Box>
            <Box>
              <Text fontStyle="italic">“The AI replies saved us dozens of hours a week. We love it!”</Text>
              <Text fontWeight="bold" mt={2}>— Carlos, Ops Manager at SmartElectro</Text>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" py={20}>
        <Container maxW="xl" textAlign="center">
          <Heading size="lg" mb={4}>Need help or want a custom plan?</Heading>
          <Text mb={6}>Contact us at <Link color="brand.500" href="mailto:support@chatsaas.io">support@chatsaas.io</Link></Text>
          <Button colorScheme="brand">Start Free Trial</Button>
        </Container>
      </Box>

      {/* CTA */}
      <VStack>
        <Button colorScheme="brand" size="lg">Start Free Trial</Button>
        <Text>
          Already a member? <Link color="brand.500">Login here</Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default LandingPage;