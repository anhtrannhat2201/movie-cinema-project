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
  capNhatPhimUploadAction,
  getInforMovieAction,
} from "../../../../Redux/Actions/ManageMoviesAction";
const dateFormat = "DD/MM/YYYY";
const Edit = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const { inforFilms } = useSelector((state) => state.reducerManageMovie);

  const dispatch = useDispatch();
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getInforMovieAction(id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: inforFilms?.maPhim,
      tenPhim: inforFilms?.tenPhim,
      trailer: inforFilms?.trailer,
      moTa: inforFilms?.moTa,
      ngayKhoiChieu: inforFilms.ngayKhoiChieu,
      sapChieu: inforFilms?.sapChieu,
      dangChieu: inforFilms?.dangChieu,
      hot: inforFilms?.hot,
      danhGia: inforFilms?.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      values.maNhom = GROUPID;
      // tạo đối tượng form data => đưa giá trị values từ formik vào form data
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      // cập nhật phim upload action
      dispatch(capNhatPhimUploadAction(formData));
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
    let ngayKhoiChieu = moment(value);
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

  const handleChangeFile = async (e) => {
    // Lấy file ra từ e

    let file = e.target.files[0];

    // Đem dữ liệu lưu vào formik
    await formik.setFieldValue("hinhAnh", file);

    // setValidation

    if (
      file.type === "image/apng" ||
      file.type === "image/gif" ||
      file.type === "image/jpeg" ||
      file.type === "image/png"
    ) {
      // tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result); //hình base 64
      };
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
        <h3 className="text-4xl">Chỉnh sửa phim</h3>
        <Form.Item label="Tên Phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô Tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Ngày Khởi Chiếu">
          <DatePicker
            onChange={handleChangeDatePicker}
            defaultValue={moment(formik.values.ngayKhoiChieu)}
            format={dateFormat}
          />
        </Form.Item>
        <Form.Item label="Đang Chiếu">
          {/* Close Function */}
          {/* Nó sẽ trả về value ko trả về target */}

          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp Chiếu">
          {/* Close Function */}
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot">
          {/* Close Function */}
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Số Sao">
          {/* Close Function */}
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            min={1}
            max={10}
            value={formik.values.danhGia}
          />
        </Form.Item>
        <Form.Item label="Hình Ảnh">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/apng, image/gif, image/jpeg, image/png"
          />
          <br />
          <img
            style={{ width: 200, height: 200 }}
            src={imgSrc === "" ? inforFilms.hinhAnh : imgSrc}
            alt="...."
          />
        </Form.Item>
        <Form.Item label="Tác Vụ">
          <button type="submit" className="bg-blue-400 text-white p-3 rounded ">
            Cập nhật phim
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Edit;
