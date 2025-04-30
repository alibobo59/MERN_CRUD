import React from "react";
// import { Box } from "@chakra-ui/react";
// import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "@/store/product";
import { useEffect } from "react";
import { Heading, Container, VStack, SimpleGrid } from "@chakra-ui/react";
import ProductCard from "@/components/ProductCard";
function HomePage() {
  // const bgColor = useColorModeValue("white", "gray.800");
  // const textColor = useColorModeValue("gray.800", "white");
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
            base: 3,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Heading as="h2" size="lg" mt={8}>
            No products found
          </Heading>
        )}
      </VStack>
    </Container>
  );
}

export default HomePage;
