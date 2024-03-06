import React, { useState, useEffect } from "react";

// Chakra imports
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  List,
  ListItem,
  Button,
  Flex,
  useDisclosure,
  Text,
  useColorModeValue,
  VStack,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  Input,
  Link,
  Image,
} from "@chakra-ui/react";
import p1 from "assets/img/Untitled-removebg-preview.png";
import p2 from "assets/img/tele.png";
import p3 from "assets/img/Paypal.png";
import p4 from "assets/img/visa.jpeg";
import { HSeparator } from "components/separator/Separator.jsx";

// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import { FiChevronDown } from "react-icons/fi";
import {
  IoCheckmarkCircle,
  IoArrowBack,
  IoArrowForward,
  IoAdd,
} from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import contentData from "views/admin/default/variables/content.json";
import axios from "axios";
export default function TotalSpent(props) {
  const { ...rest } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [buttonLabel, setButtonLabel] = useState("TSM SHARE");
  const [restShare, setRestShare] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [result, setResult] = useState(null);
  const [total, setTotal] = useState(null);

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
        const shareType = apiData.currentShareInfo.shareCatagory;

        // console.log("trlog", res)

        setData({
          prs,
          developmentTable: res.obj,
          shareType,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if (!data) {
    // Render loading state or return null
    return null;
  }
  const persent = data.prs;
  const shareInfo = data.shareType;
  if (persent != "100%" && shareInfo === "ordinary") {
    setRestShare(true);
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setButtonLabel(option);
    // Additional logic or data fetching based on the selected option
  };
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value <= 0 ? null : value);
  };
  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  const renderModalContent = () => {
    switch (selectedOption) {
      case "FRANCHISE SHARE":
        return (
          <VStack align="start" spacing={4} p={1} m={1} overflowY="auto">
            <Box h="350px">
              <Text mb={4}>
                <Checkbox
                  isChecked={checkboxChecked}
                  onChange={handleCheckboxChange}
                />
                <strong>Type 1: G +1 (Shop + Cafe)</strong>
              </Text>
              <Text ml={6} mb={2}>
                Starting Price: $6,000,000 - Starting price may vary by location
                and time
              </Text>
              {/* Conditionally render input placeholders when the checkbox is checked */}
              {checkboxChecked && (
                <>
                  <>
                    <Input
                      ml={6}
                      mb={2}
                      placeholder="Number of Type 1 Shop you want to buy"
                    />
                    <Input
                      ml={6}
                      mb={2}
                      placeholder="Which advertised location do you want to purchase"
                    />
                    <Input ml={6} mb={2} placeholder="Input Placeholder 3" />
                  </>
                  <Box>
                    <Text ml={6} mb={2}>
                      Will vou pavina 100% of the franchise fee unfront?!
                    </Text>
                  </Box>
                  <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
                    <Radio ml={6} mb={2} onChange={() => {}}>
                      Yes
                    </Radio>
                    <Radio mb={2} onChange={() => {}}>
                      No
                    </Radio>
                  </Flex>
                </>
              )}
              <Text mb={4}>
                <Checkbox />
                <strong>Type 2: Single Level (Shop Only)</strong>
              </Text>
              <Text ml={6} mb={2}>
                Starting Price: $4,000,000 - Starting price may vary by location
                and time
              </Text>
              <Text ml={6} mb={2} fontWeight="bold">
                NB:
              </Text>

              <Text ml={6} mb={2}>
                • This document is the property of PurposeBlack, and
                unauthorized use or distribution is strictly prohibited.
              </Text>
              <Text ml={6} mb={2}>
                • This application form is used for the sole purpose of
                PurposeBlack Franchise sale.
              </Text>
              <Text ml={6} mb={2}>
                • This form is just an application to purchase a PurposeBlack
                franchise and does not guarantee that the application will be
                accepted.
              </Text>
              <Text ml={6} mb={2}>
                • This is the first step of the franchise purchase process, and
                if the application is accepted, franchisees will be required to
                complete a franchise agreement and complete payment before the
                share and franchise certificates are sent to them.
              </Text>
              <Flex justify="space-between" ml="50px" w="400px">
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

                {/* Option 4 */}
                <Link href="" _hover={{ textDecor: "none" }}>
                  <Text mb={1}>
                    <Checkbox />
                    <strong>100%</strong>
                  </Text>
                </Link>
              </Flex>

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
                <Link
                  href="/path/to/image4-link"
                  _hover={{ textDecor: "none" }}
                >
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
              <Button
                bg={boxBg}
                w="450px"
                ml="60px"
                mb="25px"
                fontSize="sm"
                fontWeight="600"
                color={textColorSecondary}
                borderRadius="7px"
              >
                Pay
              </Button>
            </Box>
          </VStack>
        );

      default:
        return null;
    }
  };
  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };

  const calculateTotalCost = (selectedOption) => {
    const percentage = parseFloat(selectedOption.replace("%", ""));
    const cost = (percentage / 100) * quantity * 100;
    return isNaN(cost) ? 0 : cost.toFixed(2);
  };

  const handleNextClick = () => {
    if (currentIndex < contentData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const calculateTotal = () => {
    if (!selectedOption) {
      return 0;
    }

    const percentage = parseFloat(selectedOption.replace("%", ""));
    const total = (percentage / 100) * quantity * 100;
    const roundedTotal = isNaN(total) ? 0 : total.toFixed(2);
    setResult(roundedTotal); // Set the result state
    return roundedTotal;
  };

  const handleCalculateButtonClick = () => {
    const total = calculateTotal();
    setTotal(total);
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Chakra Color Mode

  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      {...rest}
    >
      <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
        <Flex align="center" w="100%">
          <Text
            me="auto"
            color={textColor}
            fontSize="xl"
            fontWeight="700"
            lineHeight="100%"
          >
            Additional Investment
          </Text>

          <Button
            ms="auto"
            align="center"
            justifyContent="center"
            bg="#d7a022"
            w="100px"
            h="37px"
            lineHeight="100%"
            onClick={onOpen}
            borderRadius="10px"
            {...rest}
          >
            <Text
              me="auto"
              color="#ffff"
              fontSize="xl"
              fontWeight="500"
              lineHeight="70%"
            >
              Add
            </Text>
            <Icon as={IoAdd} color="#ffff" w="24px" h="24px" />
          </Button>
          {restShare ? (
            <Modal
              isOpen={isOpen}
              onClose={() => {
                onClose();
                setSelectedOption(null);
              }}
              isCentered
              size="xl"
              maxH="650px"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <Flex
                  justify="space-between"
                  ps="0px"
                  pe="20px"
                  pt="5px"
                  flexDirection={{ base: "column", lg: "row" }}
                  alignItems={{ base: "center", lg: "flex-start" }}
                >
                  <ModalBody>
                    <Popover>
                      <PopoverTrigger>
                        <Text
                          color={textColor}
                          fontWeight="bold"
                          fontSize={{ base: "3xl", lg: "4xl" }}
                          lineHeight="150%"
                          mt={{ base: 0, lg: "3rem" }}
                          ml={{ base: 0, lg: "3rem" }}
                          mb="2rem"
                          textAlign={{ base: "center", lg: "3rem" }}
                        >
                          Please Complete
                          <br />
                          Remaining Payment!
                          <br />
                        </Text>
                      </PopoverTrigger>
                    </Popover>
                  </ModalBody>
                </Flex>
              </ModalContent>
            </Modal>
          ) : (
            <Modal
              isOpen={isOpen}
              onClose={() => {
                onClose();
                setSelectedOption(null);
                setQuantity(null);
                setTotal(null);
              }}
              isCentered
              size="xl"
              maxH="650px"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Type</ModalHeader>
                <ModalCloseButton />
                <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
                  <ModalBody>
                    <Popover>
                      <PopoverTrigger>
                        <Button>{buttonLabel}</Button>
                      </PopoverTrigger>
                    </Popover>
                  </ModalBody>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </Flex>
                {buttonLabel === "FRANCHISE SHARE" && renderModalContent()}
                {buttonLabel !== "FRANCHISE SHARE" && (
                  <>
                    <Box
                      justify="space-between"
                      ml="50px"
                      w="400px"
                      flexDirection="row"
                    >
                      <RadioGroup
                        onChange={(value) => handleRadioChange(value)}
                        value={selectedOption}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Text>
                            <Link  _hover={{ textDecor: "none" }}>
                              <FormControl>
                                <Radio value="25%" onClick={handleCalculateButtonClick}/>
                              </FormControl>
                              <strong>25%</strong>
                            </Link>
                          </Text>
                        </Box>

                        <Box>
                          <Text mb={1}>
                            <Link  _hover={{ textDecor: "none" }}>
                              <FormControl>
                                <Radio value="50%" onClick={handleCalculateButtonClick}/>
                              </FormControl>
                              <strong>50%</strong>
                            </Link>
                          </Text>
                        </Box>

                        <Box>
                          <Text mb={1}>
                            <Link  _hover={{ textDecor: "none" }}>
                              <FormControl>
                                <Radio value="75%" onClick={handleCalculateButtonClick}/>
                              </FormControl>
                              <strong>75%</strong>
                            </Link>
                          </Text>
                        </Box>

                        {/* Option 4 */}
                        <Box>
                          <Text mb={1}>
                            <Link  _hover={{ textDecor: "none" }}>
                              <FormControl>
                                <Radio value="100%" onClick={handleCalculateButtonClick}/>
                              </FormControl>
                              <strong>100%</strong>
                            </Link>
                          </Text>
                        </Box>
                      </RadioGroup>
                    </Box>
                    {/* <Button
                      bg={boxBg}
                      justifyContent="center"
                      alignItems="center"
                      ml="12rem"
                      mt="2rem"
                      mb="25px"
                      fontSize="sm"
                      fontWeight="600"
                      color="#ffff"
                      borderRadius="7px"
                      onClick={handleCalculateButtonClick}
                      backgroundColor="#d7a022"
                      width="10rem"
                    >
                      Calculate
                    </Button> */}
                    {result !== null && (
                      <Text
                      ml="12rem"
                      mt='2rem'
                      fontSize="20"
                      fontWeight="800">
                        Result: {result} birr {/* No need to use toFixed(2) here */}
                      </Text>
                    )}

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
                      <Link href="" _hover={{ textDecor: "none" }}>
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
                      <Link
                        href="/path/to/image4-link"
                        _hover={{ textDecor: "none" }}
                      >
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
                    <Button
                      bg={boxBg}
                      w="450px"
                      ml="60px"
                      mb="25px"
                      fontSize="sm"
                      fontWeight="600"
                      color="#ffff"
                      borderRadius="7px"
                      backgroundColor="#d7a022"
                    >
                      Pay
                    </Button>
                  </>
                )}
              </ModalContent>
            </Modal>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
