import { HStack, Link as ChakraLink, Flex } from "@chakra-ui/react";
import { Link as ScrollLink } from "react-scroll";

const TopMenu: React.FC = () => {
    return (
        <Flex
            as="nav"
            position="sticky"
            top="0"
            zIndex="10"
            bg="whiteAlpha.900"
            backdropFilter="saturate(180%) blur(10px)"
            boxShadow="sm"
            py={4}
            justify="center"
        >
            <HStack gap={10}>
                {["Home", "Features", "Pricing", "Testimonials", "Contact"].map((section) => (
                    <ScrollLink
                        key={section}
                        to={section.toLowerCase()}
                        smooth={true}
                        duration={500}
                        offset={-80}
                    >
                        <ChakraLink fontWeight="semibold" color="gray.600" _hover={{ color: "brand.500" }}>
                            {section}
                        </ChakraLink>
                    </ScrollLink>
                ))}
            </HStack>
        </Flex>
    );
};

export default TopMenu;
