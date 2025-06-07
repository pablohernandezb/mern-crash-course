import { useState } from 'react';
import { Box, Button, Dialog, Heading, HStack, IconButton, Image, Portal, Text, CloseButton, Input, VStack } from '@chakra-ui/react';
import { FaRegEdit, FaEraser } from "react-icons/fa";
import { toaster } from "@/components/ui/toaster"

import { useProductStore } from '../store/product';

const ProductCard = ({product}) => {

    const [open, setOpen] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const { deleteProduct, updateProduct }   = useProductStore()
    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);
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
    }

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        setOpen(false);
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
                description: "Product updated successfully",
                type: "success",
                isClosable: true
            });
        }
    };
    return (
    <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={{ base: "white", _dark: "gray.800" }}
    >
        <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
        <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
                {product.name}    
            </Heading>
            <Text fontWeight="bold" fontSize="xl" color={{ base: "gray.600", _dark: "gray.200" }}>
                ${product.price}
            </Text>
            <HStack spacing={2}>
                <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
                    <Dialog.Trigger asChild>
                        <IconButton colorPalette="blue">
                            <FaRegEdit color="white" />
                        </IconButton>
                    </Dialog.Trigger>
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Update Product</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <VStack spacing={4}>
                                    <Input
                                        placeholder='Product Name'
                                        name='name'
                                        value={updatedProduct.name}
                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}    
                                    />
                                    <Input
                                        placeholder='Price'
                                        name='price'
                                        type='number'
                                        value={updatedProduct.price}
                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}   
                                    />
                                    <Input
                                        placeholder='Image URL'
                                        name='image'
                                        value={updatedProduct.image}
                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                                    />
                                </VStack>
                            </Dialog.Body>
                            <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">
                                    Cancel
                                </Button>
                            </Dialog.ActionTrigger>
                                <Button 
                                    colorPalette={"blue"}
                                    onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                                >
                                    Update
                                </Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
                <IconButton onClick={() => handleDeleteProduct(product._id)} colorPalette="red">
                    <FaEraser color="white" />
                </IconButton>
            </HStack>
        </Box>
    </Box>
  );
};

export default ProductCard;