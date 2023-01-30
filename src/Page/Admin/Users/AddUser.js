import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { GROUPID } from "../../../Services/ConfigURL";
import { useNavigate, useParams } from "react-router";
import {
  layDanhSachNguoiDungTheoNhomAction,
  layThongTinLoaiNguoiDungAction,
  themNguoiDungUploadAction,
} from "../../../Redux/Actions/QuanLyNguoiDungAction";
import { movieServ } from "../../../Services/UserService";

const AddUser = () => {
  const [componentSize, setComponentSize] = useState("default");

  const [state, setState] = useState({
    loaiNguoiDung: [],
  });
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // const { id } = useParams();
  useEffect(() => {
    async function fetchdata() {
      try {
        let result = await movieServ.layDanhSachLoaiNguoiDung();
        setState({
          ...state,
          loaiNguoiDung: result.data.content,
        });
      } catch (error) {
        console.log("error: ", error.response?.data);
      }
    }
    fetchdata();
  }, []);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    onSubmit: (values) => {
      console.log("values: ", values);
      values.maNhom = GROUPID;
      // values.maLoaiNguoiDung = arrUser.maLoaiNguoiDung;
      // tạo đối tượng form data => đưa giá trị values từ formik vào form data
      let formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      dispatch(themNguoiDungUploadAction(values));
      setTimeout(() => {
        navigate("/admin/user");
      }, 1500);
    },
  });
  const handleChangeLoaiNguoiDung = async (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };
  // const convertSelectHTR = () => {
  //   return loaiNguoiDung.tenLoai;
  // };
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3 className="text-4xl">Thêm Người Dùng Mới</h3>
        <Form.Item label="Tài khoản">
          <Input name="taiKhoan" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input name="matKhau" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Họ tên">
          <Input name="hoTen" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input name="soDt" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mã loại người dùng">
          <Select
            name="maLoaiNguoiDung"
            options={state.loaiNguoiDung?.map((lnd, index) => ({
              label: lnd.tenLoai,
              value: lnd.maLoaiNguoiDung,
            }))}
            onChange={handleChangeLoaiNguoiDung}
          />
        </Form.Item>
        <Form.Item label="Tác Vụ">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-400 text-white p-3 rounded "
          >
            Thêm người dùng
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddUser;
