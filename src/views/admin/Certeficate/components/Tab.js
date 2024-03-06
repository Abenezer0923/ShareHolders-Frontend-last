import {
  ChakraProvider,
  Box,
  Tabs,
  TabList,
  Tab,
  SimpleGrid,
  TabPanel,
  TabPanels,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";

import React, { useState }  from "react";
import Card from "components/card/Card"; // Import your custom Card component
import cc2 from "assets/img/CC2.jpg";
import det from "views/admin/CereficateDetail";
import { Link } from 'react-router-dom';
import routes from "routes";
import Templete from "views/admin/Templete";



function MyTabs() {
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [dynamicRoutes, setDynamicRoutes] = useState(routes);
  const [ress, SetRess] = useState(true)

  const addDynamicRoute = () => {
    // Check if the route is already added
    const templeteRouteExists = dynamicRoutes.some((route) => route.path === '/Templete');

    if (!templeteRouteExists) {
      // Add the dynamic route
      const newDynamicRoutes = [...dynamicRoutes, {
        layout: '/admin',
        path: '/Templete',
        component: Templete,
        hidden: true,
      }];

      setDynamicRoutes(newDynamicRoutes);
    }
  };
  return (
    ress ? (<Box ml="10rem" mt="6rem">
      <Text fontSize="2.5rem">
        Coming Soon !!!!
      </Text>
    </Box>) : (<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    <ChakraProvider>
      <Box p={4}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>All</Tab>
            <Tab>Franchise</Tab>
            <Tab>Ordinary</Tab>
            <Tab>TSM</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={[1, 2, 2, 4]} spacing={4}>
                {/* Card 1 */}
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>

                {/* Card 2 */}
                {/* Add similar cards with different images */}
              </SimpleGrid>
            </TabPanel>
            {/* Add content for other tabs as needed */}
            <TabPanel>
              <SimpleGrid columns={[1, 2, 2, 4]} spacing={4}>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={[1, 2, 2, 4]} spacing={4}>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              
              <SimpleGrid columns={[1, 2, 2, 4]} spacing={4}>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
                <Card>
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={cc2}
                      alt="Card Image"
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                    <Link to="Templete" style={{ textDecoration: "none" }}>
                      <Button
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor='#d7a022'
                        color='#ffff'
                        fontWeight="bold"
                        onClick={addDynamicRoute}
                        fontSize="lg"
                      >
                        Preview
                      </Button>
                    </Link>
                  </Box>
                </Card>
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  </Box>)
  );
}

export default MyTabs;
