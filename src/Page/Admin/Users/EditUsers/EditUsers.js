import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GROUPID } from "../../../../Services/ConfigURL";

import {
  capNhatUserUploadAction,
  getInforUserAction,
} from "../../../../Redux/Actions/QuanLyNguoiDungAction";
import { movieServ } from "../../../../Services/UserService";

const EditUsers = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [state, setState] = useState({
    loaiNguoiDung: [],
  });
  const { inforUser } = useSelector((state) => state.userReducer);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

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
    dispatch(getInforUserAction(id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: id,
      matKhau: inforUser[0]?.matKhau,
      email: inforUser[0]?.email,
      soDT: inforUser[0]?.soDT,
      maLoaiNguoiDung: inforUser[0]?.maLoaiNguoiDung,
      hoTen: inforUser[0]?.hoTen,
    },
    onSubmit: (values) => {
      values.maNhom = GROUPID;
      // tạo đối tượng form data => đưa giá trị values từ formik vào form data
      let formData = new FormData();

      for (let key in values) {
        formData.append(key, values[key]);
      }
      // cập nhật phim upload action
      dispatch(capNhatUserUploadAction(values));
      setTimeout(() => {
        navigate("/admin/user");
      }, 3000);
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
        <h3 className="text-4xl">Cập Nhật Người Dùng </h3>
        <Form.Item label="Tài khoản">
          <Input
            disabled
            id="taiKhoan"
            name="taiKhoan"
            onChange={formik.handleChange}
            defaultValue={formik.values.taiKhoan}
          />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input
            name="matKhau"
            value={formik.values.matKhau}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Họ tên">
          <Input
            name="hoTen"
            value={formik.values.hoTen}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            name="soDt"
            value={formik.values.soDT}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Mã loại người dùng">
          <Select
            value={formik.values.maLoaiNguoiDung}
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
            Cập nhật người dùng
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditUsers;
