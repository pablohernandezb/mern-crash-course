import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"

import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {

  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();  
  }, [fetchProducts]);
  console.log("products", products)

  return ( 
    <Container maxW="6xl" px={12}>
      <VStack gap={8}>
				<Text
          textStyle={{ base: "xl", sm: "3xl" }}
          fontWeight={"bold"}
          textAlign={"center"}
          bgClip={"text"}
          bgGradient={"to-r"} 
          gradientFrom={"cyan.400"} 
          gradientTo={"blue.500"}
				>
					Current Products 🚀
				</Text>

        <SimpleGrid
          columns={[
            1,
            2,
            3
          ]} 
          gap={"10px"}
          w={"full"}
        >
           {products.map((product) => (
            <ProductCard key={product._id} product={product} />
           ))}
        </SimpleGrid>

				{products.length === 0 && (  
          	<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
              No products found 😢{" "}
              <Link to={"/create"}>
                <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                  Create a product
                </Text>
              </Link>
          </Text>
        )}
      </VStack>
      <Toaster />
    </Container>
  );
};

export default HomePage;