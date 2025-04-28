import { Box, Container, Flex, Text, Button } from "@chakra-ui/react";
import { FaPlusSquare, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useColorModeValue } from "./ui/color-mode";

function NavBar() {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("blue.600", "blue.300"); // Add this line for better visibility

  return (
    <Box
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top="0"
      zIndex="sticky">
      <Container maxW="1140px" px={4} py={4}>
        <Flex align="center" justify="space-between">
          <Text
            as={Link}
            to="/"
            color={textColor}  // Use solid color instead of gradient
            fontSize="3xl"
            fontWeight="extrabold"
            _hover={{
              color: useColorModeValue("blue.700", "blue.400"),
              textDecoration: "none",
            }}>
            Product Store
          </Text>

          <Flex gap={4}>
            <Button
              as={Link}
              to="/"
              colorScheme="blue"
              variant="ghost"
              leftIcon={<FaHome />}
              _hover={{
                bg: "blue.100",
              }}>
              Home
            </Button>

            <Button
              as={Link}
              to="/create"
              colorScheme="blue"
              leftIcon={<FaPlusSquare />}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s">
              Create
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default NavBar;
