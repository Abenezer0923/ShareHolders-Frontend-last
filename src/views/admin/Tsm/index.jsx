import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  SimpleGrid,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import CheckTable from "views/admin/Franchise/components/CheckTable";
import { columnsDataDevelopment } from "views/admin/Franchise/variables/columnsData";
import tableDataDevelopment from "views/admin/Franchise/variables/tableDataDevelopment.json";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import { columnsHistoryCheck } from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/Franchise/variables/tableDataCheck.json";

import DevelopmentTable from "views/admin/Franchise/components/DevelopmentTable";
import Ordinary from "views/admin/Tsm/components/Ordinary";
import Total from "views/admin/Tsm/components/Total";
import Voice from "views/admin/Tsm/components/Voice";

export default function UserReports() {
  const [data, setData] = useState(null);
  const [rest, setRest] = useState(false);
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

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

        let lists = [];
        for (let i = 0; i < apiData.shareCatagoryTotal.length; i++) {
          lists.push(apiData.shareCatagoryTotal[i]._id);
        }
        let idxOfOrdinary = lists.indexOf("ordinary");
        let idxOfFranchis = lists.indexOf("franchise");
        let idxOfTsm = lists.indexOf("tsm");
        let valueOfTsm = 0;
        let valueOfOrdinary = 0;
        let valueOfFranchise = 0;
        if (idxOfOrdinary !== -1) {
          valueOfOrdinary = apiData.shareCatagoryTotal[idxOfOrdinary].total;
        }
        if (idxOfFranchis !== -1) {
          valueOfFranchise = apiData.shareCatagoryTotal[idxOfFranchis].total;
        }

        if (idxOfTsm !== -1) {
          valueOfTsm = apiData.shareCatagoryTotal[idxOfTsm].total;
        }

        const res = { obj: apiData.payment_history.slice(0, 3) };
        const curr = { ans: apiData.completedShareInfo.slice(0, 3) };
        const prs = apiData.currentPayment.percentage;
        const shareType = apiData.currentShareInfo.shareCatagory;

        const tsmData = {
          name: "TSM",
          growth: "buy",
          value: `${valueOfTsm}`,
        };

        setData({
          prs,
          tsmData,
          developmentTable: res.obj,
          info: curr.ans,
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

  return (
    parseInt(data.tsmData.value) === 0 ? (
      <Box>
        <Text color="#000" mt="12rem" ml="10rem" fontSize="xxx-large">You Don't Have TSM Share!!</Text>
      </Box>
    ) : (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, "xl": 2 }}
          gap='25px'
          mb='20px' >
            
          {rest && <Ordinary />}
          <Total />
        </SimpleGrid>
  
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
          <Box>
          <Voice  mb='20px'/>
          <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={data.developmentTable}
        />
          </Box>
          <CheckTable columnsData={columnsHistoryCheck} tableData={data.info}  w='50%'/>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        
          {/* <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
          /> */}
          
          
        </SimpleGrid>
     
      </Box>
    )
  );
  
}
