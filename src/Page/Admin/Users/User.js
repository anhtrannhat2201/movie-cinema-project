import React, { Fragment, useEffect } from "react";
import { Button, Table, Tag } from "antd";
import {
  AudioOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import {
  layDanhSachNguoiDungTheoNhomAction,
  xoaNguoiDungAction,
} from "../../../Redux/Actions/QuanLyNguoiDungAction";
const { Search } = Input;

export default function User() {
  const { arrUserDetail } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachNguoiDungTheoNhomAction());
  }, []);

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",

      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      width: "15%",

      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",

      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      width: "25%",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",

      // sorter: (a, b) => {
      //   let tenphimA = a.tenPhim.toLowerCase().trim();
      //   let tenphimB = b.tenPhim.toLowerCase().trim();
      //   if (tenphimA > tenphimB) {
      //     return 1;
      //   }
      //   return -1;
      // },
      width: "20%",

      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",

      width: "20%",

      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (text) => {
        if (text == "QuanTri") {
          return <Tag color="red">Quản Trị</Tag>;
        } else {
          return <Tag color="blue">Khách Hàng</Tag>;
        }
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hành động",
      dataIndex: "taiKhoan",
      render: (text, user) => {
        return (
          <Fragment>
            <NavLink
              to={`/admin/user/edituser/${user.taiKhoan}`}
              className="mr-2 ml-2 text-2xl"
              key={1}
              style={{ color: "blue" }}
            >
              <EditOutlined />
            </NavLink>
            <span
              className="text-2xl hover:cursor-pointer"
              onClick={() => {
                // gọi action xóa
                if (
                  window.confirm(
                    "Bạn có muốn xóa người dùng " + user.hoTen + " không"
                  )
                ) {
                  // gọi action
                  dispatch(xoaNguoiDungAction(user.taiKhoan));
                }
              }}
              key={2}
              style={{ color: "red" }}
            >
              <DeleteOutlined />
            </span>
          </Fragment>
        );
      },
      width: "20%",
    },
  ];
  const data = arrUserDetail;

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const onSearch = (value) => {
    console.log(value);
    // Goi api laydanhsachphim

    dispatch(layDanhSachNguoiDungTheoNhomAction(value));
  };

  return (
    <div className="text-4xl">
      <h3>Quản lý User</h3>
      <NavLink to={"/admin/user/adduser"}>
        <Button type="primary" className="mb-3 rounded">
          Thêm mới Nguời dùng
        </Button>
      </NavLink>
      <Search
        placeholder="Tìm kiếm tài khoản người dùng"
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        rowKey={"taiKhoan"}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
}
