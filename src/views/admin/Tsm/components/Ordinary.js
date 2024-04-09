import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  RadioGroup,
  VStack,
  Radio,
  useColorModeValue,
  Popover,
  PopoverArrow,
  PopoverTrigger,
  PopoverHeader,
  PopoverCloseButton,
  useDisclosure,
  PopoverBody,
  PopoverContent,
  ListItem,
  List,
  Spinner,
} from "@chakra-ui/react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import Card from "components/card/Card.js";
import {
  FiChevronRight,
  FiUpload,
  FiCheckCircle,
  FiXCircle,
  FiCamera,
} from "react-icons/fi";

import p1 from "assets/img/Untitled-removebg-preview.png";
import p2 from "assets/img/tele.png";
import p3 from "assets/img/Paypal.png";
import p4 from "assets/img/visa.jpeg";

export default function TotalSpent(props) {
  const [selectedPercentage, setSelectedPercentage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bankTransfer");
  const [dynamicOptions, setDynamicOptions] = useState([]);
  const [buttonPersent, setButtonPersent] = useState("");
  const [birr, setBirr] = useState("");
  const [calculatedAmount, setCalculatedAmount] = useState(null);
  const [popoverHeaders, setPopoverHeader] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const [shareHolderId, setShareHolderId] = useState(null);
  const [Persentagess, setThePersentage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [paymentOrders, setPaymentOrders] = useState([]);
  const [paymentOrderStatus, setpaymentOrderStatus] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [shareCatagoryType, setshareCatagoryType] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0); // Define uploadProgress
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPaymentPending, setIsPaymentPending] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data", // Adding the Content-Type header
        };

        const response = await axios.get(
           process.env.REACT_APP_API_URL,
          { headers }
        );

        const apiData = response.data.data;
        const thePersentage = apiData.currentPayment.percentage;
        const PaymentOrders = apiData.payment_Order;
        const havePaymentOrders = apiData.payment_Order;
        const paymentStatuss = havePaymentOrders ? havePaymentOrders.paymentStatus : null;
        const shareCatagorys = havePaymentOrders ? havePaymentOrders.shareCatagory : null;
        setPaymentOrders(havePaymentOrders);
        setpaymentOrderStatus(paymentStatuss);
        setshareCatagoryType(shareCatagorys);

        const percentage = parseInt(apiData.currentPayment.percentage);
        const amount = apiData.currentPayment.amountPaid;
        setSelectedPercentage(percentage);
        const remainingPercentage = 100 - percentage;
        const theIDss = apiData.currentPayment._id;
        const shareId = apiData.shareHolderInfo._id;
        setPaymentId(theIDss);
        setShareHolderId(shareId);
        setThePersentage(thePersentage);

        const options = [];
        for (let i = 25; i <= remainingPercentage; i += 25) {
          options.push({ value: i, label: `${i}%`, amount: amount });
        }
        setDynamicOptions(options);

        // Check if there are any pending payments for "Tsm" category
        const isPaymentPending = PaymentOrders.some(order => order.shareCatagory === "tsm" && order.paymentStatus === "Pending");
        setIsPaymentPending(isPaymentPending);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    const config = {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setUploadProgress(progress);
      },
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:2024/api/orderPayment/bankPayment",
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
          ...config,
        }
      );
      console.log("Upload successful:", response.data);
      console.log("to see the image", response.data);
      setUploadedImage(response.data.imageUrl);
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handlePercentageSelection = (percentage, amount) => {
    const Totalres = amount * 100;
    const res = (percentage / 100) * Totalres;
    setCalculatedAmount(res);
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleOptionClick = (option) => {
    setPopoverHeader(option);
  };

  const handleAccountNumberChange = (event) => {
    console.log("the Acc num is", event.target.value);
    setAccountNumber(event.target.value);
  };

  const handlePayButtonClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("acc_No", accountNumber);
      formData.append("percentage", buttonPersent);
      formData.append("amount_birr", calculatedAmount);
      formData.append("image", selectedFile);
      formData.append("paymentMethod", popoverHeaders);
      formData.append("payment_id", paymentId);
      formData.append("shareHolder_id", shareHolderId);
      formData.append("paymentStatus", "Pending");
      formData.append("shareCatagory", "tsm");

      const responseFromBack = await axios.post(
        "http://localhost:2024/api/orderPayment/bankPayment",
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from backend:", responseFromBack.data);
      setpaymentOrderStatus("Pending");
      setIsPaymentPending(true); // Set the payment as pending
    } catch (error) {
      console.error("Error while sending data:", error);
    }
  };

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w={{ base: "90%", md: "80%", lg: "70%", xl: "80%" }}
      p={{ base: "20px", md: "40px" }}
    >
      {isPaymentPending ? (
        <Text color="#d7a022" fontSize="2xl">The Payment is Pending...</Text>
      ) : (
        <>
          <Flex justify="space-between" width="100%">
            <Text
              color={textColor}
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              lineHeight="100%"
            >
              Tsm
            </Text>
          </Flex>
          <Flex
            w="100%"
            flexDirection={{ base: "column", lg: "row" }}
            alignItems={{ base: "center", lg: "flex-start" }}
            mt={{ base: "2rem", lg: "4rem" }}
          >
            <Box
              minH="160px"
              minW={{ base: "100%", lg: "30%" }}
              mr={{ base: 0, lg: "3rem" }}
            >
              <Text
                color={textColor}
                fontWeight="bold"
                fontSize={{ base: "xl", lg: "xl" }}
                lineHeight="100%"
              >
                Please Complete
                <br />
                Remaining Payment!
                <br />
              </Text>
            </Box>
            <Box
              style={{
                width: "70%",
                maxWidth: 200,
                paddingRight: "0px",
                marginBottom: "5rem",
                color: "#d7a022",
              }}
            >
              <CircularProgressbar
                styles={{
                  path: { stroke: "#d7a022" },
                  text: { fill: "#d7a022" },
                }}
                value={selectedPercentage}
                text={`${selectedPercentage}%`}
              />
            </Box>
          </Flex>
          <Button
            bg={boxBg}
            fontSize="lg"
            fontWeight="bold"
            color="#ffff"
            backgroundColor="#d7a022"
            borderRadius="7px"
            onClick={() => setIsExpanded(!isExpanded)}
            display={isExpanded ? "none" : "block"}
            mt={{ base: "4", lg: "0" }}
          >
            Continue
          </Button>
          <Box display={isExpanded ? "block" : "none"}>
            {/* Form components go here */}
            <Flex direction="column" mt="2rem">
              <Text fontSize="lg">Choose Percentage:</Text>
              <Flex direction="row">
                {dynamicOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={
                      selectedPercentage === option.value ? "solid" : "outline"
                    }
                    colorScheme="blue"
                    onClick={() => {
                      handlePercentageSelection(option.value, option.amount);
                      setButtonPersent(option.label);
                    }}
                    mr={2}
                  >
                    {option.label}
                  </Button>
                ))}
              </Flex>
              <Flex>
                {calculatedAmount && (
                  <Text fontSize="lg" mt={4}>
                    Calculated amount: {calculatedAmount} birr
                  </Text>
                )}
              </Flex>
            </Flex>
            <Flex
              direction={{ base: "column", lg: "row" }}
              justify="space-between"
              ps="0px"
              pe="20px"
              pt="5px"
              mr="2rem"
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
              mt={{ base: "3rem", lg: "1rem" }}
              ml={{ base: "0", lg: "4rem" }}
            >
              <RadioGroup
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <VStack align={{ base: "start", lg: "stretch" }} spacing={4}>
                  <Flex direction={{ base: "column", lg: "row" }}>
                    <Radio
                      value="bankTransfer"
                      ml={{ base: "0", lg: "2rem" }}
                      fontSize="lg"
                    >
                      Bank Transfer
                    </Radio>
                  </Flex>
                </VStack>
              </RadioGroup>
            </Flex>
            {paymentMethod === "bankTransfer" && (
              <>
                <Button
                  mt="4"
                  fontSize="lg"
                  rightIcon={<FiChevronRight />}
                  onClick={onOpen}
                >
                  Select Bank
                </Button>

                <Popover isOpen={isOpen} onClose={onClose}>
                  <PopoverTrigger>
                    <Button mt="4" fontSize="lg">
                      {popoverHeaders}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Options</PopoverHeader>
                    <PopoverBody>
                      <List spacing={3}>
                        {["Abyssiniya", "СВЕ", "Awash"].map((option, index) => (
                          <ListItem
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            _hover={{ background: "gray.100", cursor: "pointer" }}
                            borderRadius="md"
                            px={3}
                            py={2}
                          >
                            <Text fontSize="lg">{option}</Text>
                          </ListItem>
                        ))}
                      </List>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>

                <Box w={{ base: "100%", lg: "250px" }} mr="0rem">
                  <Input
                    ml={{ base: "6", lg: "6" }}
                    mb={2}
                    fontSize="lg"
                    placeholder="Enter account number"
                    value={accountNumber}
                    onChange={handleAccountNumberChange}
                  />
                </Box>
              </>
            )}

            <Flex>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="upload"
              />
              <label htmlFor="upload">
                <Button
                  bg="blue.200"
                  fontSize="sm"
                  as="span"
                  leftIcon={<FiCamera />}
                >
                  Upload Image
                </Button>
              </label>
              {uploadProgress > 0 && <div>Progress: {uploadProgress}%</div>}
              {selectedFile && <div>Selected File: {selectedFile.name}</div>}
              {selectedFile && (
                <img
                  src={selectedFile}
                  alt="Uploaded"
                  style={{ maxWidth: "100px" }}
                />
              )}
            </Flex>

            <Flex mt={{ base: "2rem", lg: "1rem" }}>
              <Button
                onClick={() => setIsExpanded(false)}
                w={{ base: "100%", lg: "150px" }}
                color="#ffff"
                backgroundColor="#d7a022"
                fontSize="lg"
              >
                Back
              </Button>
              <Button
                ml="1rem"
                w={{ base: "100%", lg: "150px" }}
                color="#ffff"
                backgroundColor="#d7a022"
                fontSize="lg"
                onClick={handlePayButtonClick}
              >
                Pay
              </Button>
            </Flex>
          </Box>
        </>
      )}
    </Card>
  );
}
