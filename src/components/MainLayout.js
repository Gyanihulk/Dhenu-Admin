import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
  AiOutlineLogout,
} from "react-icons/ai";

import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiBarn } from "react-icons/gi";
import { FaDonate } from "react-icons/fa";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const authState = useSelector((state) => state);
  const { user, isError, isSuccess, isLoading, message } = authState.auth;
  // console.log(user)
  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white text-center py-2 mb-0">
            <span className="sm-logo"><img
              src="/logo-2.png"
              alt="Dhenu Dharma Logo"
              style={{ height: "40px" }} // Adjust as needed
            /></span>
            <span className="lg-logo">
              <img
                src="/logo.png"
                alt="Dhenu Dharma Logo"
                style={{ height: "50px" }} // Adjust as needed
              />
            </span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              localStorage.clear();
              window.location.reload();
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "users",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Users",
            },
            {
              key: "Cow Shed",
              icon: <GiBarn className="fs-4" />,
              label: "Cow Shed",
              children: [
                {
                  key: "cow-shed",
                  icon: <GiBarn className="fs-4" />,
                  label: "Add Cow Shed",
                },
                {
                  key: "list-cow-sheds",
                  icon: <GiBarn className="fs-4" />,
                  label: "Cow Shed List",
                },
                // {
                //   key: "brand",
                //   icon: <SiBrandfolder className="fs-4" />,
                //   label: "Brand",
                // },
                // {
                //   key: "list-brand",
                //   icon: <SiBrandfolder className="fs-4" />,
                //   label: "Brand List ",
                // },
                // {
                //   key: "category",
                //   icon: <BiCategoryAlt className="fs-4" />,
                //   label: "Category",
                // },
                // {
                //   key: "list-category",
                //   icon: <BiCategoryAlt className="fs-4" />,
                //   label: "Category List",
                // },
                // {
                //   key: "color",
                //   icon: <AiOutlineBgColors className="fs-4" />,
                //   label: "Color",
                // },
                // {
                //   key: "list-color",
                //   icon: <AiOutlineBgColors className="fs-4" />,
                //   label: "Color List",
                // },
              ],
            },
            {
              key: "collected-donations",
              icon: <FaDonate className="fs-4" />,
              label: "Collected Donations",
            },
            {
              key: "upcoming-donations",
              icon: <FaDonate className="fs-4" />,
              label: "Upcoming Donations",
            },
            // {
            //   key: "marketing",
            //   icon: <RiCouponLine className="fs-4" />,
            //   label: "Marketing",
            //   children: [
            //     {
            //       key: "coupon",
            //       icon: <ImBlog className="fs-4" />,
            //       label: "Add Coupon",
            //     },
            //     {
            //       key: "coupon-list",
            //       icon: <RiCouponLine className="fs-4" />,
            //       label: "Coupon List",
            //     },
            //   ],
            // },
            // {
            //   key: "blogs",
            //   icon: <FaBloggerB className="fs-4" />,
            //   label: "Blogs",
            //   children: [
            //     {
            //       key: "blog",
            //       icon: <ImBlog className="fs-4" />,
            //       label: "Add Blog",
            //     },
            //     {
            //       key: "blog-list",
            //       icon: <FaBloggerB className="fs-4" />,
            //       label: "Blog List",
            //     },
            //     {
            //       key: "blog-category",
            //       icon: <ImBlog className="fs-4" />,
            //       label: "Add Blog Category",
            //     },
            //     {
            //       key: "blog-category-list",
            //       icon: <FaBloggerB className="fs-4" />,
            //       label: "Blog Category List",
            //     },
            //   ],
            // },
            // {
            //   key: "Help & Feedback",
            //   icon: <FaClipboardList className="fs-4" />,
            //   label: "Enquiries",
            // },
            {
              key: "signout",
              icon: <AiOutlineLogout className="fs-4" />,
              label: "Sign Out",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="d-flex gap-3 align-items-center dropdown">
              {/* <div>
                <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                />
              </div> */}
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{user && user?.first_name}</h5>
                <p className="mb-0">{user && user?.email}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
