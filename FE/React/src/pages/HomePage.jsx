import React from "react";
// import { Box } from "@chakra-ui/react";
// import { useColorModeValue } from "@/components/ui/color-mode";

import { Button } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

function HomePage() {
  // const bgColor = useColorModeValue("white", "gray.800");
  // const textColor = useColorModeValue("gray.800", "white");

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        toaster.create({
          description: "File saved successfully",
          type: "info",
        })
      }>
      Show Toast
    </Button>
  );
}

export default HomePage;
