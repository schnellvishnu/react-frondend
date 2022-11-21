import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import * as RiIcons from "react-icons/ri";
import * as  IoIcons from "react-icons/io";
import * as  AiIcons from "react-icons/ai";
const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  
  {
    path: "/account/ReadDataGrid",
    name: "Account",
    icon: <IoIcons.IoIosPaper />,
  },
  {
    path: "/dashboard/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/po/podatagrid",
    name: "Productionorder",
    icon: <BiAnalyse />,
  },
  {
    path: "/barcode/bardatagrid",
    name: "Barcode",
    icon: <IoIcons.IoMdBarcode/>,
  },
  {
    path: "/snprovider/sndatagrid",
    name: "Snprovider",
    icon: <IoIcons.IoMdBarcode/>,
  },
  {
    path: "/regsystem/regsystemdatagrid",
    name: "Registered System",
    icon: <IoIcons.IoMdBarcode/>,
  },
  {
    path: "/stock/stockdatagrid/",
    name: "Stock",
    icon: <IoIcons.IoMdBarcode/>,
  },
  {
    path: "/company/comdatagrid",
    name: "Company",
    icon: <MdMessage />,
  },
  {
    path: "/product/productdatagrid",
    name: "Product",
    icon: <MdMessage />,
  },
  
  {
    path: "/customer/cusdatagrid",
    name: "Customers",
    icon: <AiIcons.AiOutlineUser/>,
    subRoutes: [
      {
        path: "/customer/cusdatagrid",
        name: "Customer ",
        icon: <AiIcons.AiOutlineUser/>,
      },
      {
        path: "/customerlocation/cuslocdatagrid/",
        name: "CustomerLocation",
        icon: <AiIcons.AiFillEnvironment/>,
      },
      // {
      //   path: "/settings/billing",
      //   name: "Billing",
      //   icon: <FaMoneyBill />,
      // },
    ],
  },
  {
    path: "/manufacture/manudatagrid",
    name: "ManufacturingLocation",
    icon: <AiIcons.AiFillEnvironment/>,
  },
  // {
  //   path: "/settings",
  //   name: "Settings",
  //   icon: <BiCog />,
  //   exact: true,
  //   subRoutes: [
  //     {
  //       path: "/settings/profile",
  //       name: "Profile ",
  //       icon: <FaUser />,
  //     },
  //     {
  //       path: "/settings/2fa",
  //       name: "2FA",
  //       icon: <FaLock />,
  //     },
      // {
      //   path: "/settings/billing",
      //   name: "Billing",
      //   icon: <FaMoneyBill />,
  //     // },
  //   ],
  // },
  {
    path: "/shippo/shippodatagrid/",
    name: "Shippo",
    icon: <AiFillHeart />,
  },
  {
    path: "/audit/auditdatagrid/",
    name: "Audit Trial",
    icon: <AiFillHeart />,
  },
  {
    path: "/report/productionorderreport",
    name: "Report",
    icon: <IoIcons.IoIosPaper />,
  },
  
];


const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
