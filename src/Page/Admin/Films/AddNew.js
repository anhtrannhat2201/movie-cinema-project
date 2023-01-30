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
import React, { useState } from "react";
import { useFormik } from "formik";
import moment from "moment";

import { useDispatch } from "react-redux";
import { GROUPID } from "../../../Services/ConfigURL";
import { addFilmsUploadFilmsAction } from "../../../Redux/Actions/ManageMoviesAction";
import { useNavigate } from "react-router-dom";

const AddNew = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values) => {
      values.maNhom = GROUPID;
      // tạo đối tượng form data => đưa giá trị values từ formik vào form data
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      dispatch(addFilmsUploadFilmsAction(formData));
      setTimeout(() => {
        navigate("/admin/films");
      }, 1500);
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleChangeDatePicker = (value) => {
    // Chuyển ừ {} moment thành string momemt Để nó khớp với Api
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    // Sử dụng setFieldValue để gán giá trị
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    // Đây là Close Function
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e) => {
    // Lấy file ra từ e

    let file = e.target.files[0];

    // setValidation

    if (
      file.type === "image/apng" ||
      file.type === "image/gif" ||
      file.type === "image/jpeg" ||
      file.type === "image/png"
    ) {
      //
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };

      // Đem dữ liệu lưu vào formik
      formik.setFieldValue("hinhAnh", file);
    }
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
        <h3 className="text-4xl">Thêm Phim Mới</h3>
        <Form.Item label="Tên Phim">
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô Tả">
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày Khởi Chiếu">
          <DatePicker
            format={"DD / MM / YYYY"}
            onChange={handleChangeDatePicker}
          />
        </Form.Item>
        <Form.Item label="Đang Chiếu">
          {/* Close Function */}
          {/* Nó sẽ trả về value ko trả về target */}

          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp Chiếu">
          {/* Close Function */}
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot">
          {/* Close Function */}
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Số Sao">
          {/* Close Function */}
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            min={1}
            max={10}
          />
        </Form.Item>
        <Form.Item label="Hình Ảnh">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/apng, image/gif, image/jpeg, image/png"
          />
          <br />
          <img style={{ width: 200, height: 200 }} src={imgSrc} alt="...." />
        </Form.Item>
        <Form.Item label="Tác Vụ">
          <button type="submit" className="bg-blue-400 text-white p-3 rounded ">
            Thêm Phim
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNew;
