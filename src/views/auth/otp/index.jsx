/* eslint-disable */
// ... (other imports)

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
import purposeBlackLogo from "../../../components/icons/purposeblackethiopia.png";

// Assets
import { usernameValidate } from "../../../helper/validate";
import ii from "assets/img/ETH.png";
import ll from "assets/img/ppp.jpg";
import imgs from "assets/img/Purpose-black.jpg"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import {  verifyOTP } from "../../../helper/helper";
import { useAuthStore } from "../../../store/store";

function SignIIn() {
  const history = useHistory();
  const { username, token } = useAuthStore((state) => state.auth);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   generateOTP(username).then((OTP) => {
  //     console.log(OTP);
  //     if (OTP) return toast.success("OTP has been sent to your email!");
  //     return toast.error("Problem while generating OTP!");
  //   });
  // }, [username]);

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { otp } = values;
  
        // Make the OTP verification request
        const { status, data } = await verifyOTP({ otp });
  
        if (status === 200) {
          // Assuming the token is present in the response data
          const { token } = data;
  
          // Save the token to local storage
          localStorage.setItem('token', token);
  
          // Redirect to the specified route using the token
          history.push("/admin/default");
  
          toast.success("Verification Successful!");
        } else {
          toast.error("Invalid token or verification failed!");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        toast.error("Wrong OTP! Check again!");
      }
    },
  });
  
  

  const handleClick = () => setShow(!show);

  // const resendOTP = () => {
  //   let sentPromise = generateOTP(username);

  //   toast.promise(sentPromise, {
  //     loading: 'Sending...',
  //     success: <b>OTP has been sent to your email!</b>,
  //     error: <b>Could not send it!</b>,
  //   });

  //   sentPromise.then((OTP) => {
  //     console.log(OTP);
  //   });
  // };

  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  return (
    <DefaultAuth illustrationBackground={imgs} image={imgs}>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        {/* <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your Verification Code to Sign in!!
          </Text>
        </Box> */}
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
          boxShadow="lg"
          padding="3rem"
        >
          {/* <Flex align="center" mb="25px">
            <HSeparator />
            <Text color="gray.400" mx="14px">
              here
            </Text>
            <HSeparator />
          </Flex> */}
          <Flex align="center" mb="0px">
            <Image
              src={purposeBlackLogo}
              alt="Purpose Black Ethiopia Logo"
              my="0px"
            />
            <HSeparator mb="20px" />
          </Flex>
          <FormControl as="form" onSubmit={formik.handleSubmit}>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              OTP<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                onChange={formik.handleChange}
                value={formik.values.otp}
                onBlur={formik.handleBlur}
                name="otp"
                fontSize="2xl"
                placeholder=""
                mb="24px"
                size="lg"
                type="number" 
                textAlign="center" // Center-align the digits
                borderRadius="8px"
                
              />
              {/* <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement> */}
            </InputGroup>
            <Flex justifyContent="space-between" align="center" mb="24px">
              {/* <FormControl display="flex" alignItems="center">
                <Checkbox id="remember-login" colorScheme="brandScheme" me="10px" />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl> */}
            </Flex>
            <Button
              type="submit"
              fontSize="sm"
              color = '#fff'
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              backgroundColor="#d7a022"
              _hover={{ backgroundColor: "#e9b334" }} // Add hover effect
              _active={{ backgroundColor: "#c1931e" }}
            >
              Sign In
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            {/* <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Can't get OTP?
              <Text
                color={textColorBrand}
                as="span"
                ms="5px"
                // onClick={resendOTP}
                fontWeight="500"
              >
                Resend
              </Text>
            </Text> */}
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIIn;
