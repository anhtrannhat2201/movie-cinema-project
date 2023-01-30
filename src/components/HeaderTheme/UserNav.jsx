import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { localServ } from "../../Services/LocalService";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import "../../assets/styles/UserNav.css";
export default function UserNav() {
  // Lấy về userInfor bằng useSelector = mapStateToProps
  let user = useSelector((state) => {
    return state.userReducer.userInfor;
  });
  const { thongTinNguoiDung } = useSelector((state) => state.userReducer);

  const { Option } = Select;
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };
  const { t, i18n } = useTranslation();

  let handleRemove = () => {
    localServ.user.remove();
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  let renderContent = () => {
    if (user) {
      return (
        <>
          <NavLink to="/lichsudatveuser">
            <button
              style={{
                width: 52,
                height: 52,
                backgroundColor: "rgba(191, 62, 129, 0.8)",
              }}
              className=" mr-3 font-medium rounded-full opacity-100 text-white"
            >
              {user.hoTen.substr(0, 1)}
            </button>
          </NavLink>
          <button
            onClick={() => {
              handleRemove();
            }}
            className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 text-gray-700 signout"
          >
            Đăng Xuất
          </button>
          {/* border  border-none hover:scale-110 hover:duration-500  rounded px-5 py-2 text-light bg-green-500 */}
        </>
      );
    } else {
      return (
        <div className="flex justify-between">
          <div className="items-center flex-shrink-0 hidden lg:flex ml-5">
            <NavLink to="/login">
              <button className="self-center px-8 py-3 rounded">
                {t("Đăng Nhập")}
              </button>
            </NavLink>
            <NavLink to="/signup">
              <button
                className="border self-center px-8 py-3 font-semibold rounded bg-sky-400 text-gray-900
                        "
                data-toggle="modal"
                data-target="#exampleModalCenterr"
              >
                {t("Đăng kí")}
              </button>
            </NavLink>
          </div>
          <div className="mt-2 ml-5 language">
            <Select
              defaultValue="Ngôn Ngữ"
              style={{
                width: 110,
              }}
              onChange={handleChange}
            >
              <Option value="vi">Việt Nam</Option>
              <Option value="eng">English</Option>
              <Option value="chi">China</Option>
            </Select>
          </div>
        </div>
      );
    }
  };
  // border  border - none hover: scale - 110 hover: duration - 500  rounded px - 5 py - 2 text - light bg - green - 500
  return <div className="space-x-5">{renderContent()}</div>;
}
