import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { Toaster, toaster } from "@/components/ui/toaster"

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: ''
    });

    const { createProduct } = useProductStore();

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct)
        if(!success) {
            toaster.create({
                title: "Error",
                description: message,
                type: "error",
                isClosable: true
            });
        } else {
            toaster.create({
                title: "Success",
                description: message,
                type: "success",
                isClosable: true
            });
        }
        setNewProduct({ name: "", price: "", image: "" });
    };

    return (
    <Container maxW={"sm"}>
        <VStack
            spacing={8}
        >
            <Heading as={"h1"} size="3xl" textAlign={"center"} mb={8}>
                Create New Product
            </Heading>
                
                <Box w={"full"} bg={{ base: "white", _dark: "gray.800" }} 
                p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input 
                            placeholder="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <Input 
                            placeholder="Price"
                            name="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <Input
                            placeholder="Image URL"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />

                        <Button colorScheme="blue" onClick={handleAddProduct} w="full">
                            Add Product
                        </Button>
                    </VStack>
                </Box>
        </VStack>
         <Toaster />
    </Container>
    );
};

export default CreatePage;