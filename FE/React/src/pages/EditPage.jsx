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
import React, { useState, useEffect } from "react";
import { useProductStore } from "@/store/product";
import { useParams, useNavigate } from "react-router-dom";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProductStore();
  const product = products.find((p) => p._id === id);

  // Define color values for light and dark modes
  const colors = {
    heading: useColorModeValue("gray.700", "white"),
    boxBg: useColorModeValue("white", "gray.800"),
    border: useColorModeValue("gray.200", "gray.700"),
    inputFocusBorder: useColorModeValue("blue.100", "blue.400"),
  };

  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        name: product.name,
        price: product.price.toString(),
        image: product.image,
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!updatedProduct.name || !updatedProduct.name.trim()) {
      toaster.create({
        type: "error",
        description: "Product name is required",
      });
      return;
    }

    if (!updatedProduct.price || updatedProduct.price <= 0) {
      toaster.create({
        type: "error",
        title: "Invalid Price",
        description: "Please enter a valid price",
      });
      return;
    }

    if (!updatedProduct.image) {
      toaster.create({
        type: "error",
        title: "Invalid Image URL",
        description: "Image URL is required",
      });
      return;
    }

    const productData = {
      name: updatedProduct.name.trim(),
      price: Number(updatedProduct.price),
      image: updatedProduct.image,
    };

    try {
      const res = await updateProduct(id, productData);
      if (res.success) {
        toaster.create({
          type: "success",
          title: "Product Updated",
          description: res.message,
          isCloseAble: true,
        });
        navigate("/");
      } else {
        toaster.create({
          type: "error",
          title: "Error",
          description: res.message,
          isCloseAble: true,
        });
      }
    } catch (err) {
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
          color={colors.heading}>
          Edit Product
        </Heading>
        <Box
          w={"100%"}
          bg={colors.boxBg}
          p={8}
          rounded={"xl"}
          shadow={"lg"}
          borderWidth="1px"
          borderColor={colors.border}>
          <VStack spacing={6}>
            <Stack w="full">
              <Text fontWeight="medium">Product Name</Text>
              <Input
                name="name"
                value={updatedProduct.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                size="lg"
                borderColor="blue.400"
                _focus={{ borderColor: colors.inputFocusBorder }}
              />
            </Stack>

            <Stack w="full">
              <Text fontWeight="medium">Price</Text>
              <Input
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                type="number"
                size="lg"
                borderColor="blue.400"
                _focus={{ borderColor: colors.inputFocusBorder }}
              />
            </Stack>

            <Stack w="full">
              <Text fontWeight="medium">Image URL</Text>
              <Input
                name="image"
                value={updatedProduct.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                size="lg"
                borderColor="blue.400"
                _focus={{ borderColor: colors.inputFocusBorder }}
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
              Update Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default EditPage;
