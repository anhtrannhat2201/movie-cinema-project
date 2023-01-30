import {
  Button,
  Checkbox,
  Form,
  Input,
  Cascader,
  DatePicker,
  InputNumber,
  Select,
  message,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { quanLyDatVeServ } from "../../../Services/BookticketsManage";
import { movieServ } from "../../../Services/MovieService";

export default function ShowTime() {
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  useEffect(() => {
    async function fetchdata() {
      try {
        let result = await movieServ.layThongTinHeThongRap();
        setState({
          ...state,
          heThongRapChieu: result.data.content,
        });
      } catch (error) {
        message.error(error.response?.data);
      }
    }
    fetchdata();
  }, []);
  const { id } = useParams();
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      try {
        let result = await quanLyDatVeServ.taoLichChieu(values);

        message.success(result.data.content);

        setTimeout(() => {
          navigate("/admin/films");
        }, 1500);
      } catch (error) {
        message.error(error.response?.data);
      }
    },
  });

  const onOk = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };
  const convertSelectHTR = () => {
    return state.heThongRapChieu?.map((hethongrap, index) => {
      return {
        label: hethongrap.tenHeThongRap,
        value: hethongrap.tenHeThongRap,
      };
    });
  };

  const handleChangeHeThongRap = async (value) => {
    // Từ hệ thống rạp call api lấy thông tin rạp
    try {
      let result = await movieServ.layThongTinCumRapTheoHeThong(value);

      setState({
        ...state,
        cumRapChieu: result.data.content,
      });
    } catch (error) {
      message.error(error.response?.data);
    }
  };
  const handleChangeCumRap = async (value) => {
    formik.setFieldValue("maRap", value);
  };
  let films = {};
  if (localStorage.getItem("filmParams")) {
    films = JSON.parse(localStorage.getItem("filmParams"));
  }
  return (
    <div className="container ">
      <Form
        name="basic"
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onSubmitCapture={formik.handleSubmit}
      >
        <h3 className="text-3xl">Tạo lịch chiếu- {films.tenPhim}</h3>
        <img src={films.hinhAnh} alt={films.hinhAnh} width={200} height={200} />
        <Form.Item label="Hệ thống rạp">
          <Select
            options={convertSelectHTR()}
            onChange={handleChangeHeThongRap}
            placeholder="Chọn hệ thống rạp"
          />
        </Form.Item>
        <Form.Item label="Cụm rạp">
          <Select
            options={state.cumRapChieu?.map((cumRap, index) => ({
              label: cumRap.tenCumRap,
              value: cumRap.maCumRap,
            }))}
            onChange={handleChangeCumRap}
            placeholder="Chọn cụm rạp"
          />
        </Form.Item>

        <Form.Item label="Ngày chiếu">
          <DatePicker
            format={"DD/MM/YYYY hh:mm:ss"}
            showTime
            onChange={onChangeDate}
            onOk={onOk}
          />
        </Form.Item>
        <Form.Item label="Giá vé">
          <InputNumber
            style={{ width: "25%" }}
            onChange={onChangeInputNumber}
          />
        </Form.Item>
        <Form.Item label="Chức năng">
          <Button htmlType="submit" type="primary">
            Tạo lịch chiếu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
