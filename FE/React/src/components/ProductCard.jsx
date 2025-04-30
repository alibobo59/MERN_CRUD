import { Box, HStack, Image } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { IconButton } from "@chakra-ui/react";

import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("white", "gray.800");

  const { deleteProduct } = useProductStore();
  const handleDelete = async (pid) => {
    const res = await deleteProduct(pid);
    console.log(res);
    if (res.success) {
      toaster.create({
        title: "Success",
        description: res.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    if (!res.success) {
      toaster.create({
        title: "Error",
        description: res.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      bg={bgColor}
      color={textColor}
      p={4}
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-5px)",
        shadow: "lg",
      }}>
      <Image
        src={product.image}
        alt={product.name}
        objectFit={"cover"}
        h={48}
        w={"full"}
      />
      <Box p={4}>
        <Box as="h3" fontSize={"lg"} fontWeight={"bold"}>
          {product.name}
        </Box>
        <HStack>
          <IconButton aria-label="Search database" colorPalette={"blue"}>
            <MdEdit />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(product._id)}
            aria-label="Search database"
            colorPalette={"red"}>
            <MdDelete />
          </IconButton>
        </HStack>

        <Box as="p" fontSize={"lg"} fontWeight={"bold"} mt={2}>
          ${product.price}
        </Box>
      </Box>
    </Box>
  );
};
export default ProductCard;
