import { Box, Button, HStack } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage"; // Import the EditPage
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Box width={"100vw"} minH={"10vh"}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
      <Toaster />
    </Box>
  );
}

export default App;
