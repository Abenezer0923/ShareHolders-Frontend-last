
// Chakra imports
import { Box, SimpleGrid, Button } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/Transactions/components/DevelopmentTable";


import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/Transactions/variables/columnsData";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
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
        console.log("tr", apiData)
        const res = { obj: apiData.payment_history.slice(0, 9) };
        console.log("trlog", res)
    

        setData({
          
          resData: data,
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
  console.log("setData", data)
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
        justifyContent="center" // Center the content horizontally
        alignItems="center">
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={data.developmentTable}
          resData={data.resData}
        />
       
      </SimpleGrid>
    </Box>
  );
}
