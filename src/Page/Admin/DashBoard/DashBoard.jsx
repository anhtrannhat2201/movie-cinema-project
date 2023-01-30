import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { localServ, USER } from "../../../Services/LocalService";
import UserNav from "../../../components/HeaderTheme/UserNav";
import Films from "../Films/Films";
import SubMenu from "antd/lib/menu/SubMenu";
const { Header, Content, Footer, Sider } = Layout;

const DashBoard = (props) => {
  let { Component } = props;

  let user = useSelector((state) => {
    return state.userReducer.userInfor;
  });
  const [collapsed, setCollapsed] = useState(false);

  if (!localStorage.getItem(USER)) {
    alert("Bạn Không có quyền truy Cập vào trang này");
    return (window.location.href = "/");
  }

  if (user.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền");
    return (window.location.href = "/");
  }

  let handleRemove = () => {
    localServ.user.remove();
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };
  let opaerations = () => {
    if (user) {
      return (
        <div className="flex justify-end mt-2">
          <button
            id="logo_Hoten"
            style={{
              width: 60,
              height: 60,
              backgroundColor: "rgba(191, 62, 129, 0.8)",
            }}
            className=" font-medium rounded-full opacity-100 text-white mr-7 "
          >
            {user.hoTen.substr(0, 1)}
          </button>

          <button
            style={{ padding: "0px 15px" }}
            onClick={() => {
              handleRemove();
            }}
            className="font-semibold rounded text-lg dark:bg-violet-400 text-white bg-red-400 hover:text-neutral-900"
          >
            Đăng Xuất
          </button>
        </div>
      );
    }
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className=" bg-opacity-40 flex justify-between h-16 mx-auto">
          <div>
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="Back to homepage"
              className="flex items-center p-2 animate-bounce"
            >
              <NavLink to={"/"}>
                <h3 className="w-8 h-8 text-violet-400 text-3xl mt-3 ml-3">
                  CyberMovie
                </h3>
              </NavLink>
            </a>
          </div>
          <div>
            {/* <ul>
              <li className="flex text-right"></li>
            </ul> */}
          </div>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
          <SubMenu key="1" icon={<UserOutlined />} title="Quản Lý User ">
            <Menu.Item key="1" icon={<UserOutlined />}>
              <NavLink to={"/admin/user"}>Quản lý Người dùng</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<VideoCameraOutlined />}
            title="Quản Lý Phim "
          >
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <NavLink to={"/admin/films"}>Quản lý phim</NavLink>
            </Menu.Item>

            {/* <Menu.Item key="2" icon={<FileOutlined />}>
              <NavLink to={"/admin/addnew"}>Thêm mới Phim</NavLink>
            </Menu.Item> */}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background  "
          style={{
            paddingBottom: 80,
          }}
        >
          {opaerations()}
        </Header>
        <Content
          style={{
            margin: "0 ",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Component />
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            fontSize: "25px",
            backgroundColor: "#001529",
            color: "white",
          }}
        >
          QUẢN LÝ CYBER MOVIE
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
