import React, { useState, useEffect } from "react";
import { useProductStore } from "@/store/product";
import {
  Heading,
  Container,
  VStack,
  SimpleGrid,
  Button,
  Text,
  Dialog, // Import Dialog from Chakra UI v3
} from "@chakra-ui/react";
import ProductCard from "@/components/ProductCard";

function HomePage() {
  const { fetchProducts, products, deleteProduct } = useProductStore();
  // Manage dialog state with useState
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Function to open the confirmation dialog
  const handleOpenDeleteDialog = (productId) => {
    setProductToDelete(productId);
    setIsDialogOpen(true); // Set state to true to open
  };

  // Function to handle the actual deletion after confirmation
  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
      setProductToDelete(null);
      setIsDialogOpen(false); // Set state to false to close
      // Optionally, show a success toast here using the v3 toaster
      // toaster.create({ type: 'success', description: 'Product deleted!' });
    }
  };

  // Function to handle cancellation
  const handleCancelDelete = () => {
    setProductToDelete(null);
    setIsDialogOpen(false); // Set state to false to close
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <Container maxW={"container.xl"} py={12} px={6}>
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" mb={8}>
          All Products
        </Heading>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={() => handleOpenDeleteDialog(product._id)}
            />
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Heading as="h2" size="lg" mt={8}>
            No products found
          </Heading>
        )}
      </VStack>

      <Dialog.Root
        open={isDialogOpen} // Control open state with useState
        onClose={handleCancelDelete} // onClose still useful for closing via backdrop click/escape key
        isCentered>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Confirm Deletion</Dialog.Header>
            {/* Use onClick on the CloseTrigger button */}
            <Dialog.CloseTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                position="absolute"
                top="2"
                right="2"
                onClick={handleCancelDelete}>
                X {/* Or use an Icon */}
              </Button>
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <Text>Are you sure you want to delete this product?</Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" mr={3} onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Container>
  );
}

export default HomePage;
