import { Button, Container, Flex, HStack, Text} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ColorModeButton } from "@/components/ui/color-mode";

import { FaRegPlusSquare } from "react-icons/fa";

const Navbar = () => {
    return (
        <Container maxW="1140px" px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={{ 
                    base: "column", 
                    sm: "row" 
                }}
            >
                    <Text
                        textStyle={{ base: "xl", sm: "3xl" }}
                        fontWeight={"bold"}
                        textTransform={"uppercase"}
                        textAlign={"center"}
                        bgClip={"text"}
                        bgGradient={"to-r"} 
                        gradientFrom={"cyan.400"} 
                        gradientTo={"blue.500"}
                    >
                        <Link to={"/"}>Product Store 🛒</Link>
                    </Text>
                <HStack spacing={2} alignItems={"center"} >
                    <Link to={"/create"}>
                        <Button color={{ base: "black", _dark: "white" }} bg={{ base: "gray.100", _dark: "gray.900" }}>
                            <FaRegPlusSquare size={20} />
                        </Button>
                    </Link>
                    <ColorModeButton />
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;