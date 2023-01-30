import React, { Fragment, useEffect } from "react";
import { Button, Table } from "antd";
import {
  AudioOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getListMovie,
  xoaPhimAction,
} from "../../../Redux/Actions/ManageMoviesAction";
import { NavLink } from "react-router-dom";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
export default function Films() {
  const { arrFilmDetail } = useSelector((state) => state.reducerManageMovie);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListMovie());
  }, []);

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      sorter: (a, b) => b.maPhim - a.maPhim,
      width: "15%",

      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, films, index) => {
        return (
          <Fragment>
            <img
              src={films.hinhAnh}
              alt={films.hinhAnh}
              width={100}
              height={100}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            ></img>
          </Fragment>
        );
      },
      width: "25%",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",

      sorter: (a, b) => {
        let tenphimA = a.tenPhim.toLowerCase().trim();
        let tenphimB = b.tenPhim.toLowerCase().trim();
        if (tenphimA > tenphimB) {
          return 1;
        }
        return -1;
      },
      width: "20%",

      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",

      render: (text, films) => {
        return (
          <Fragment>
            {films.moTa.length > 100
              ? films.moTa.substr(0, 50) + "..."
              : films.moTa}
          </Fragment>
        );
      },
      width: "20%",
    },
    {
      title: "Hành động",
      dataIndex: "maPhim",

      render: (text, films) => {
        return (
          <Fragment>
            <NavLink
              to={`/admin/films/editfilms/${films.maPhim}`}
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
                    "Bạn có muốn xóa phim " + films.tenPhim + " không"
                  )
                ) {
                  // gọi action
                  dispatch(xoaPhimAction(films.maPhim));
                }
              }}
              key={2}
              style={{ color: "red" }}
            >
              <DeleteOutlined />
            </span>
            <NavLink
              to={`/admin/films/showtimes/${films.maPhim}`}
              onClick={() => {
                localStorage.setItem("filmParams", JSON.stringify(films));
              }}
              className="mr-2 ml-2 text-2xl"
              key={3}
              style={{ color: "green" }}
            >
              <CalendarOutlined />
            </NavLink>
          </Fragment>
        );
      },
      width: "20%",
    },
  ];
  const data = arrFilmDetail;

  const onChange = (pagination, filters, sorter, extra) => {};
  const onSearch = (value) => {
    // Goi api laydanhsachphim

    dispatch(getListMovie(value));
  };

  return (
    <div className="text-4xl">
      <h3>Quản lý Phim</h3>
      <NavLink to={"/admin/addnew"}>
        <Button type="primary" className="mb-3 rounded">
          Thêm mới Phim
        </Button>
      </NavLink>
      <Search
        placeholder="Tìm kiếm"
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        rowKey={"maPhim"}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
}
