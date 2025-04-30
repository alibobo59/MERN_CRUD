import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import React, { useState } from "react";
import { useProductStore } from "@/store/product";

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

  const { createProduct } = useProductStore();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form with specific messages based on backend schema
    if (!newProduct.name || !newProduct.name.trim()) {
      toaster.create({
        type: "error",
        description: "Product name is required",
      });
      return;
    }

    if (!newProduct.price || newProduct.price <= 0) {
      toaster.create({
        type: "error",
        tittle: "Invalid Price",
        description: "Please enter a valid price",
      });
      return;
    }

    if (!newProduct.image) {
      toaster.create({
        type: "error",
        title: "Invalid Image URL",
        description: "Image URL is required",
      });
      return;
    }

    // Prepare the data according to the schema
    const productData = {
      name: newProduct.name.trim(),
      price: Number(newProduct.price),
      image: newProduct.image,
    };

    // TODO: Send data to backend
    try {
      const res = await createProduct(productData);
      console.log("Submitting:", productData);
      toaster.create({
        type: "success",
        title: "Product Created",
        description: res.message,
        isCloseAble: true,
      });
    } catch (err) {
      console.log(err);
      toaster.create({
        type: "error",
        title: "Error",
        description: err.message || "An error occurred",
        isCloseAble: true,
      });
    }
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
