import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import React, { useState } from "react";

function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form with specific messages
    if (!newProduct.name) {
      toaster.create({
        type: "error",
        description: "Product name is required",
      });
      return;
    }

    if (!newProduct.price) {
      toaster.create({
        type: "error",
        description: "Price is required",
      });
      return;
    }

    if (!newProduct.description) {
      toaster.create({
        type: "error",
        description: "Description is required",
      });
      return;
    }

    // If all validations pass, show success message
    console.log("Submitting:", newProduct);
    toaster.create({
      type: "success",
      description: "Product created successfully",
    });
  };

  return (
    <Container maxW={"container.sm"} py={10}>
      <VStack spacing={8} as="form" onSubmit={handleSubmit}>
        <Heading
          as={"h1"}
          size={"lg"}
          textAlign={"center"}
          color={useColorModeValue("gray.700", "white")}>
          Create New Product
        </Heading>
        <Box
          w={"100%"}
          bg={useColorModeValue("white", "gray.800")}
          p={8}
          rounded={"xl"}
          shadow={"lg"}
          borderWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}>
          <VStack spacing={6}>
            <Stack w="full">
              <Text fontWeight="medium">Product Name</Text>
              <Input
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                size="lg"
                borderColor="blue.400"
                _focus={{ borderColor: "blue.100" }}
              />
            </Stack>

            <Stack w="full">
              <Text fontWeight="medium">Price</Text>
              <Input
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                type="number"
                size="lg"
                borderColor="blue.400"
                _focus={{ borderColor: "blue.400" }}
              />
            </Stack>

            <Stack w="full">
              <Text fontWeight="medium">Description</Text>
              <Textarea
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                size="lg"
                borderColor="blue.400"
                _focus={{ borderColor: "blue.400" }}
                rows={4}
              />
            </Stack>

            <Stack w="full">
              <Text fontWeight="medium">Image URL</Text>
              <Input
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                size="lg"
                borderColor="blue.400"
                _focus={{ borderColor: "blue.400" }}
              />
            </Stack>

            <Button
              colorScheme="blue"
              w="full"
              size="lg"
              type="submit"
              mt={4}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}>
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
