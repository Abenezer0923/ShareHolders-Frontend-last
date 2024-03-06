// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Banner(props) {
  const { banner, avatar, name, job, posts, followers, following } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
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
        console.log("apis", apiData)
        const res = { obj: apiData.payment_history.slice(0, 3) };
        const curr = {ans: apiData.completedShareInfo.slice(0,3)}
        const info = apiData.shareHolderInfo

        console.log("currr", curr)
        
        const franchiseData = {
          name: "Franchise",
          growth: "buy",
          value: apiData.completedShareInfo[1]?.numberOfShare || "0",
        };
        const ordinaryData = {
          name: "Ordinary",
          growth: "buy",
          value: apiData.completedShareInfo[0]?.numberOfShare || "0",
        };
        const tsmData = {
          name: "TSM",
          growth: "buy",
          value: apiData.completedShareInfo[2]?.numberOfShare || "0",
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
          shareInfo: curr.ans,
          info
          
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
  console.log("name ", data.info.email)
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align="center">
      <Box
        bg={`url(${banner})`}
        bgSize="cover"
        borderRadius="16px"
        h="231px"
        w="100%"
      />
      <Avatar
        mx="auto"
        src={avatar}
        h="87px"
        w="87px"
        mt="-43px"
        border="4px solid"
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize="sm">
        {job}
      </Text>
      <Flex w={{ base: "90%", md: "70%", lg: "50%", xl: "40%" }} mx="auto" mt="26px" direction="column">
  <Flex mx="auto">
    <Text color={textColorSecondary} fontSize="xl" fontWeight="500">
      Email
    </Text>
    <Text color={textColorSecondary} fontSize="sm" fontWeight="400" ml={{ base: "1rem", md: "15rem" }}>
      {data.info.email}
    </Text>
  </Flex>
  <Flex mx="auto" mt="1rem" align="center">
    <Text color={textColorSecondary} fontSize="xl" fontWeight="400">
      Phone
    </Text>
    <Text color={textColorSecondary} fontSize="sm" fontWeight="400" ml={{ base: "1rem", md: "20rem" }}>
      {data.info.phone}
    </Text>
  </Flex>
  <Flex mx="auto" mt="1rem" align="center">
    <Text color={textColorSecondary} fontSize="xl" fontWeight="400">
      Address
    </Text>
    <Text color={textColorSecondary} fontSize="sm" fontWeight="400" ml={{ base: "0.5rem", md: "22rem" }}>
      {data.info.address}
    </Text>
  </Flex>
</Flex>

    </Card>
  );
}
