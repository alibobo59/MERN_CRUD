import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();

  // Define color values for light and dark modes
  const colors = {
    text: useColorModeValue("gray.800", "white"),
    bg: useColorModeValue("white", "gray.800"),
  };

  return (
    <Box
      bg={colors.bg}
      color={colors.text}
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
        <Text fontSize={"lg"} fontWeight={"bold"} noOfLines={1} mb={2}>
          {product.name}
        </Text>
        <Text fontSize={"md"} fontWeight={"semibold"} mb={3}>
          ${product.price}
        </Text>
        <HStack>
          <IconButton
            aria-label="Edit product"
            colorPalette="blue"
            onClick={() => navigate(`/edit/${product._id}`)}>
            <MdEdit />
          </IconButton>
          <IconButton
            onClick={onDelete}
            aria-label="Delete product"
            colorPalette="red">
            <MdDelete />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
