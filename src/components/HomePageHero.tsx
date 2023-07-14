import { Heading, VStack, Flex, Text, Button, Center, Square } from '@chakra-ui/react'
import restaurantFood from 'restauranfood.jpg';

function Hero() {
    return (
        <Flex className="hero" pl="125px"  pr="125px" pt="50px" pb="50px">
            <Center
            flex="1"
            justifyContent="flex-start">
                <VStack alignItems="left" spacing={5}>
                    <Heading className='title title-display'>Little Lemon</Heading>
                    <Heading className="title title-sub">Chicago</Heading>
                    <Text className="text text-paragraph">Incididunt sint nostrud in do duis mollit labore mollit excepteur. Sit ea fugiat anim magna laborum consectetur laboris deserunt adipisicing. Esse exercitation nisi cupidatat do. Sit id labore eiusmod magna ex Lorem velit. Do cupidatat reprehenderit sunt nisi non ex cupidatat.</Text>
                    <Button width="33%" height="50px" borderRadius={16}>Reserve a table</Button>
                </VStack>
            </Center>
            <Square maxWidth="30%" >
                <img src="favicon.ico" alt="restaurant 1">
                </img>
            </Square>
        </Flex>
    );
}

export default Hero;