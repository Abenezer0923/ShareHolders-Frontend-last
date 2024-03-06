import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";

export default function NFT(props) {
  const {
    video,
    name,
    author,
    bidders,
    download,
    currentbid,
    width, // Add width prop
    height, // Add height prop
  } = props;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");

  return (
    <Card p='20px'>
      <Flex direction={{ base: "column" }} justify='center' align='center' borderRadius='20px'  overflow='hidden'  >
        <Box mb={{ base: "20px", "2xl": "20px" }} position='relative' borderRadius='20px'>
          {/* Use the provided width and height props */}
          <iframe
            width={width || "286"} // Set width, default to 686 if not provided
            height={height || "300"}
            borderRadius='20px' // Set height, default to 386 if not provided
            src={video}
            title={name}
          
            
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Box>
        <Flex flexDirection='column' justify='space-between' h='100%'>
          <Flex
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb='auto'>
            <Flex direction='column'>
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                mb='5px'
                fontWeight='bold'
                me='14px'>
                Purpose BlackETH
              </Text>
              
            </Flex>
          </Flex>
          <Flex
            align='start'
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mt='25px'>
            <Link
              href={download}
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}>
              {/* <Button
                backgroundColor='#d7a022'
                color='white'
                fontSize='sm'
                fontWeight='500'
                borderRadius='70px'
                px='24px'
                py='5px'>
                Place Bid
              </Button> */}
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
