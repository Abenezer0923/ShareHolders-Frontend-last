import React, { useState, useEffect } from "react";
import axios from "axios";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Collapse,
  Text,
  Input,
  Popover,
  Link,
  PopoverArrow,
  PopoverTrigger,
  PopoverHeader,
  Checkbox,
  ListItem,
  PopoverCloseButton,
  PopoverBody,
  PopoverContent,
  RadioGroup,
  List,
  VStack,
  Radio,
  useColorModeValue,
} from "@chakra-ui/react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import p1 from "assets/img/Untitled-removebg-preview.png";
import p2 from "assets/img/tele.png";
import p3 from "assets/img/Paypal.png";
import p4 from "assets/img/visa.jpeg";

// Custom components
import Card from "components/card/Card.js";

import { FiChevronDown, FiChevronRight } from "react-icons/fi";

export default function TotalSpent(props) {
  const { ...rest } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [options, setOptions] = useState(["Abyssiniya", "СВЕ", "Awash"]);
  const [popoverHeader, setPopoverHeader] = useState("Options");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `${token}`,
        };

        const response = await axios.get(
          "https://api.purposeblacketh.com/api/shareHolder/dashBoard/",
          { headers }
        );

        const apiData = response.data.data;
        console.log("apis", apiData)
        console.log("api total", apiData.shareCatagoryTotal)
        let lists = []
        for(let i = 0; i < (apiData.shareCatagoryTotal).length; i ++){
          lists.push(apiData.shareCatagoryTotal[i]._id)
        }
        let idxOfOrdinary = lists.indexOf('ordinary')
        let idxOfFranchis = lists.indexOf('franchise')
        let idxOfTsm = lists.indexOf('tsm')
        let valueOfTsm = 0
        let valueOfOrdinary = 0
        let valueOfFranchise = 0
        if (idxOfOrdinary !== -1){
          valueOfOrdinary = apiData.shareCatagoryTotal[idxOfOrdinary].total          
        }
        if( idxOfFranchis !== -1){
          valueOfFranchise = apiData.shareCatagoryTotal[idxOfFranchis].total
        }

        if (idxOfTsm !== -1){
          valueOfTsm = apiData.shareCatagoryTotal[idxOfTsm].total
        }
         
        
        console.log("Algo",lists)
        const res = { obj: apiData.payment_history.slice(0, 3) };
        const curr = {ans: apiData.completedShareInfo.slice(0,3)}
        console.log("currr", curr)
        
        const franchiseData = {
          
          name: "Franchise",
          growth: "buy",
          value: `${valueOfFranchise}`,
        };
        const ordinaryData = {
          name: "Ordinary",
          growth: "buy",
          value: `${valueOfOrdinary}`,
        };
        const tsmData = {
          name: "TSM",
          growth: "buy",
          value: `${valueOfTsm}`,
        };
        const totalData = {
          name: "Total",
          value:
            parseInt(franchiseData.value) +
            parseInt(ordinaryData.value) +
            parseInt(tsmData.value),
        };

        setData({
          franchiseData,
          ordinaryData,
          tsmData,
          totalData,
          checkTableData: res.obj,
          shareInfo: curr.ans
          
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [])

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);

    // Reset options and header when changing payment method
    setOptions(["Abyssiniya", "СВЕ", "Awash"]);
    setPopoverHeader("Options");
  };

  const handleOptionClick = (option) => {
    // Update only the header when an option is clicked
    setPopoverHeader(option);
  };

  const handleUpdateOptions = () => {
    // Update options and header when the button is clicked
    setOptions(["New  1", "New Option 2", "New Option 3"]);
    setPopoverHeader("Updated Options");
  };

  const percentage = 75;

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };
  const handleBackButtonClick = () => {
    setIsExpanded(false);
  };

  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `${token}`,
        };

        const response = await axios.get(
          "https://api.purposeblacketh.com/api/shareHolder/dashBoard/",
          { headers }
        );

        const apiData = response.data.data;
        //  console.log("ord", apiData)
        const res = { obj: apiData.payment_history.slice(0, 9) };
        const prs = apiData.currentPayment.percentage;
        // console.log("trlog", res)

        setData({
          prs,
          developmentTable: res.obj,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once

  if (!data) {
    // Render loading state or return null
    return null;
  }
  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      mb="0px"
      {...rest}
    >
      <Flex
        justify="space-between"
        ps="0px"
        pe="20px"
        pt="5px"
        columns={{ base: 1, md: 2, lg: 3, xl: 2 }}
      >
        <Text
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          Ordinary
        </Text>
      </Flex>
      <Flex
        w="100%"
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={{ base: "center", lg: "flex-start" }}
        mt={{ base: "2rem", lg: "5rem" }}
      >
        <Box
          minH="260px"
          minW={{ base: "100%", lg: "60%" }}
          mr={{ base: 0, lg: "2rem" }}
        >
          <Text
            color={textColor}
            fontWeight="bold"
            fontSize={{ base: "3xl", lg: "4xl" }}
            lineHeight="150%"
          >
            Please Complete
            <br />
            Remaining Payment!
            <br />
          </Text>
        </Box>
        <Box
          style={{
            width: "100%",
            maxWidth: 200,
            paddingRight: "50px",
            marginBottom: "10rem",
            color: "#d7a022",
          }}
        >
          <CircularProgressbar
            styles={{
              path: { stroke: "#d7a022" },
              text: { fill: "#d7a022" },
            }}
            value={percentage}
            text={`${data.prs}`}
          />
        </Box>
      </Flex>
      <Button
        bg={boxBg}
        fontSize="sm"
        fontWeight="500"
        color="#ffff"
        backgroundColor="#d7a022"
        borderRadius="7px"
        onClick={handleButtonClick}
        display={isExpanded ? "none" : "block"}
        mt={{ base: "4", lg: "0" }}
      >
        Continue
      </Button>
      <Collapse in={isExpanded}>
        <Box mt={{ base: "4", lg: "4" }}>
          <Box
            w={{ base: "100%", lg: "150px" }}
            mr={{ base: "0", lg: "30rem" }}
          >
            <Input ml={{ base: "6", lg: "6" }} mb={2} placeholder="Money" />
          </Box>
          <Box mt="2rem">
            <Flex
              direction={{ base: "row", lg: "row" }}
              justify="space-between"
              ml={{ base: "0", lg: "0px" }}
              w="100%"
            >
              {/* Option 1 */}
              <Link href="#" _hover={{ textDecor: "none" }}>
                <Text>
                  <Checkbox />
                  <strong>25%</strong>
                </Text>
              </Link>

              {/* Option 2 */}
              <Link href="#" _hover={{ textDecor: "none" }}>
                <Text mb={1}>
                  <Checkbox />
                  <strong>50%</strong>
                </Text>
              </Link>

              {/* Option 3 */}
              <Link href="" _hover={{ textDecor: "none" }}>
                <Text mb={1}>
                  <Checkbox />
                  <strong>75%</strong>
                </Text>
              </Link>
            </Flex>
          </Box>
          <Flex
            direction={{ base: "column", lg: "row" }}
            justify="space-between"
            ps="0px"
            pe="20px"
            pt="5px"
          >
            <Text
              me="auto"
              ml={{ base: "2rem", lg: "2rem" }}
              color={textColor}
              fontSize="xl"
              fontWeight="700"
              lineHeight="100%"
            >
              Payment
            </Text>
          </Flex>
          <Flex
            direction={{ base: "column", lg: "row" }}
            mt={{ base: "3rem", lg: "3rem" }}
            ml={{ base: "0", lg: "9rem" }}
          >
            <RadioGroup
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <VStack align={{ base: "start", lg: "stretch" }} spacing={4}>
                <Flex direction={{ base: "column", lg: "row" }}>
                  <Radio value="creditCard">Credit Card</Radio>
                  <Radio value="bankTransfer" ml={{ base: "0", lg: "2rem" }}>
                    Bank Transfer
                  </Radio>
                </Flex>
              </VStack>
            </RadioGroup>
          </Flex>
          {paymentMethod === "creditCard" && (
            <Flex justify="space-between" p={4}>
              {/* Image 1 */}
              <Link href="" _hover={{ textDecor: "none" }}>
                <Box
                  as="img"
                  src={p1}
                  alt="Image 1"
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                  cursor="pointer"
                />
              </Link>

              {/* Image 2 */}
              <Link href="#" _hover={{ textDecor: "none" }}>
                <Box
                  as="img"
                  src={p2}
                  alt="Image 2"
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                  cursor="pointer"
                />
              </Link>

              {/* Image 3 */}
              <Link href="#" _hover={{ textDecor: "none" }}>
                <Box
                  as="img"
                  src={p3}
                  alt="Image 3"
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                  cursor="pointer"
                />
              </Link>

              {/* Image 4 */}
              <Link href="" _hover={{ textDecor: "none" }}>
                <Box
                  as="img"
                  src={p4}
                  alt="Image 4"
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                  cursor="pointer"
                />
              </Link>
            </Flex>
          )}
          {paymentMethod === "bankTransfer" && (
            <>
              <Button mt="4" rightIcon={<Icon as={FiChevronRight} />}>
                Select Bank
              </Button>

              <Popover>
                <PopoverTrigger>
                  <Button mt="4">{popoverHeader}</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Options</PopoverHeader>
                  <PopoverBody>
                    <List>
                      {options.map((option, index) => (
                        <ListItem
                          key={index}
                          onClick={() => handleOptionClick(option)}
                        >
                          <Button>{option}</Button>
                        </ListItem>
                      ))}
                    </List>
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <Box w={{ base: "100%", lg: "350px" }} mr="0rem">
                <Input
                  ml={{ base: "6", lg: "6" }}
                  mb={2}
                  placeholder="Enter account number"
                />
              </Box>
            </>
          )}

          <Flex ml={{ base: "0", lg: "15rem" }}>
            <Button background={"blue.400"}>Upload Receipt</Button>
            <Button>no file selected</Button>
          </Flex>
          <Flex
            ml={{ base: "0", lg: "15rem" }}
            mt={{ base: "5rem", lg: "5rem" }}
          >
            <Button
              onClick={handleBackButtonClick}
              w={{ base: "100%", lg: "150px" }}
              color="#ffff"
              backgroundColor="#d7a022"
            >
              Back
            </Button>
            <Button
              ml="1rem"
              w={{ base: "100%", lg: "150px" }}
              color="#ffff"
              backgroundColor="#d7a022"
            >
              Pay
            </Button>
          </Flex>
        </Box>
      </Collapse>
    </Card>
  );
}
