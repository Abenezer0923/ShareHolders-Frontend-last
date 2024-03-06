import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdShare,
  MdHome,
  MdLock,
  MdKey,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/Transactions";
import RTL from "views/admin/rtl";
import What from "views/admin/what";
import Franchise from "views/admin/Franchise";
import Ordinary from "views/admin/Ordinary";
import Tsm from "views/admin/Tsm";
import Certeficate from "views/admin/Certeficate";
import Templete from "views/admin/Templete";
// Auth Imports
import SignInCentered from "views/auth/signIn";
import Otp from "views/auth/otp"

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  // {
  //   name: "Transactions",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  {
    name: "Transactions",
    layout: "/admin",
    path: "/Transactions",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: DataTables,
    secondary: true,
  },
  {
    name: "What's New",
    layout: "/admin",
    path: "/what-is-new",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: NFTMarketplace,
    
  },
  {
    name: "Franchise",
    layout: "/admin",
    path: "/franchise",
    icon: <Icon as={MdKey} width="20px" height="20px" color="inherit" />,
    component: Franchise,
  },
  // {
  //   name: "Ordinary",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  {
    name: "Ordinary",
    layout: "/admin",
    path: "/ordinary",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Ordinary,
  },
  // {
  //   name: "Example",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  {
    name: "TSM",
    layout: "/admin",
    path: "/tsm",
    icon: <Icon as={MdShare} width="20px" height="20px" color="inherit" />,
    component: Tsm,
  },
  // {
  //   name: "whattt",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  {
    name: "Certificate",
    layout: "/admin",
    path: "/certeficate",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: Certeficate,
    secondary: true,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "Otp",
    layout: "/auth",
    path: "/otp",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: Otp,
  },

  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
  {
    layout: "/admin",
    path: "/templete",
    component: Templete,
    hidden: true,
  },

];

export default routes;
