import React, { useState } from "react";
import { Box, Heading, Grid, GridItem, Button, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton, Flex, Spacer, Image } from "@chakra-ui/react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const products = [
  { id: 1, name: "T-Shirt", price: 19.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0LXNoaXJ0fGVufDB8fHx8MTcxMjM2MjAwNHww&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 2, name: "Jeans", price: 49.99, image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxqZWFuc3xlbnwwfHx8fDE3MTIzNjIwMDV8MA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 3, name: "Sneakers", price: 79.99, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzbmVha2Vyc3xlbnwwfHx8fDE3MTIzNjIwMDV8MA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 4, name: "Jacket", price: 99.99, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxqYWNrZXR8ZW58MHx8fHwxNzEyMzYyMDA1fDA&ixlib=rb-4.0.3&q=80&w=1080" },
];

const Index = () => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    setQuantity(1);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const incrementQuantity = (id) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const decrementQuantity = (id) => {
    setCart(cart.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={8}>
        Retail Store POS
      </Heading>
      <Grid templateColumns="2fr 1fr" gap={8}>
        <GridItem>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            {products.map((product) => (
              <Box key={product.id} borderWidth={1} borderRadius="lg" p={4}>
                <Image src={product.image} alt={product.name} mb={4} />
                <Heading as="h3" size="md">
                  {product.name}
                </Heading>
                <Heading as="h4" size="sm" mb={4}>
                  ${product.price}
                </Heading>
                <Flex>
                  <Input type="number" min={1} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} mr={2} />
                  <Button colorScheme="blue" onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                </Flex>
              </Box>
            ))}
          </Grid>
        </GridItem>
        <GridItem>
          <Heading as="h2" size="lg" mb={4}>
            Cart
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Quantity</Th>
                <Th>Price</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {cart.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>
                    <Flex>
                      <IconButton icon={<FaMinus />} onClick={() => decrementQuantity(item.id)} mr={2} />
                      {item.quantity}
                      <IconButton icon={<FaPlus />} onClick={() => incrementQuantity(item.id)} ml={2} />
                    </Flex>
                  </Td>
                  <Td>${(item.price * item.quantity).toFixed(2)}</Td>
                  <Td>
                    <IconButton icon={<FaTrash />} onClick={() => removeFromCart(item.id)} colorScheme="red" />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex mt={8}>
            <Spacer />
            <Box>
              <Heading as="h3" size="md">
                Total: ${total.toFixed(2)}
              </Heading>
              <Button colorScheme="green" size="lg" mt={4}>
                Checkout
              </Button>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Index;
