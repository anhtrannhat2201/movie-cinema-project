import React from "react";
import { NavLink } from "react-router-dom";
import { USER } from "../../Services/LocalService";
import UserNav from "./UserNav";
import "../../assets/styles/Header.css";
import { Fragment } from "react";
import { useSelector } from "react-redux";
export default function HeaderTheme() {
  let user = useSelector((state) => {
    return state.userReducer.userInfor;
  });
  const renderContent = () => {
    if (localStorage.getItem(USER) && user.maLoaiNguoiDung === "QuanTri") {
      return (
        <div>
          <header
            style={{
              backgroundColor: "#FFFFFFF2",
              top: 0,
              left: "auto",
              right: 0,
              marginBottom: 60,
            }}
            className="p-2 text-gray-100 fixed w-full z-10 shadow-xl"
          >
            <div className="bg-opacity-40 flex justify-between h-16 mx-auto">
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Back to homepage"
                className="flex items-center p-2 "
              >
                <NavLink to={"/"}>
                  <h3 className="w-10 h-8 text-gray-600 text-3xl">
                    Movie<span className="text-cyan-600">X</span>Cinema{" "}
                  </h3>
                </NavLink>
              </a>
              <ul
                style={{ marginLeft: 225 }}
                className="items-stretch hidden space-x-5 lg:flex cover"
              >
                <li className="flex">
                  <a
                    rel="noopener noreferrer"
                    href="#Card"
                    className=" flex items-center px-4 -mb-1 border-b-2 border-transparent text-gray-700 border-violet-400"
                  >
                    Lịch Chiếu
                  </a>
                </li>
                <li className="flex">
                  <a
                    rel="noopener noreferrer"
                    href="#tabsmovies"
                    className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-gray-700"
                  >
                    Cụm Rạp
                  </a>
                </li>
                <li className="flex">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-gray-700"
                  >
                    Tin Tức
                  </a>
                </li>
                <li className="flex">
                  <a
                    rel="noopener noreferrer"
                    href="#footer"
                    className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-gray-700"
                  >
                    Ứng Dụng
                  </a>
                </li>
                <li className="flex">
                  <NavLink to={"/admin/user"}>
                    <a
                      style={{ paddingTop: 16 }}
                      rel="noopener noreferrer"
                      href="#footer"
                      className="flex items-center justify-center px-4 -mb-1 border-b-2 border-transparent text-gray-700"
                    >
                      Quản Lí
                    </a>
                  </NavLink>
                </li>
              </ul>
              <div className="items-center flex-shrink-0 hidden lg:flex cover">
                <UserNav />
              </div>
              <button className="p-4 lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              {/* responsive */}
              <label htmlFor="nav_mobile-input" className="nav_bars">
                <i className="fa-solid fa-bars" />
              </label>
            </div>
            <input
              type="checkbox"
              name=""
              className="nav_input"
              id="nav_mobile-input"
            />
            <label htmlFor="nav_mobile-input" className="over_lays"></label>
            <div className="nav_mobile">
              <label htmlFor="nav_mobile-input" className="nav-moblie-close">
                <i class="fa-solid fa-xmark"></i>
              </label>
              <div className="mt-2 ml-2"></div>
              <ul className="nav-mobile-list mt-3 ml-3">
                <li>
                  <NavLink to="/login">
                    <h1 className="self-center px-8 text_sign">Đăng Nhập</h1>
                  </NavLink>
                  <NavLink to="/signup">
                    <h1
                      className=" user_nav self-center px-8 font-semibold text_sign  text-gray-900
                      "
                      data-toggle="modal"
                      data-target="#exampleModalCenterr "
                    >
                      Đăng kí
                    </h1>
                  </NavLink>

                  <a
                    rel="noopener noreferrer"
                    href="#Card"
                    className="nav-mobile-link self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 text-gray-700 signout"
                  >
                    Lịch Chiếu
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="#tabsmovies"
                    className="nav-mobile-link self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 text-gray-700 signout"
                  >
                    Cụm Rạp
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="nav-mobile-link self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 text-gray-700 signout"
                  >
                    Tin Tức
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="#footer"
                    className="nav-mobile-link self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 text-gray-700 signout"
                  >
                    Ứng Dụng
                  </a>
                </li>
                <li>
                  <NavLink to={"/admin/user"}>
                    <a
                      style={{ paddingTop: 16, color: "#333" }}
                      rel="noopener noreferrer"
                      href="#footer"
                      className="nav-mobile-link self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 text-gray-700 signout"
                    >
                      Quản Lí
                    </a>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/"}>
                    <a
                      style={{ paddingTop: 16, color: "#333" }}
                      rel="noopener noreferrer"
                      href="#footer"
                      className="nav-mobile-link self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 text-gray-700 signout"
                    >
                      Trang Chủ
                    </a>
                  </NavLink>
                </li>
              </ul>
              {/* </div> */}
            </div>
          </header>
        </div>
      );
    } else {
      return (
        <div>
          <header
            style={{
              backgroundColor: "#FFFFFFF2",
              top: 0,
              left: "auto",
              right: 0,
              marginBottom: 60,
            }}
            className="p-2 text-gray-100 fixed w-full z-10 shadow-xl"
          >
            <div className=" bg-opacity-40 flex justify-between h-16 mx-auto">
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Back to homepage"
                className="flex items-center p-2 animate-bounce"
              >
                <NavLink to={"/"}>
                  <h3 className="w-8 h-8 text-purple-700 text-3xl">
                    CyberMovie
                  </h3>
                </NavLink>
              </a>
              <ul
                style={{ marginLeft: 225 }}
                className="items-stretch hidden space-x-5 lg:flex cover"
              >
                <li className="flex">
                  <a
                    rel="noopener noreferrer"
                    href="#Card"
                    className=" flex items-center px-4 -mb-1 border-b-2 border-transparent text-gray-700 border-violet-400"
                  >
                    Lịch Chiếu
                  </a>
                </li>
                <li className="flex">
                  <a
                    rel="noopener noreferrer"
                    href="#tabsmovies"
                    className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-gray-700"
                  >
                    Cụm Rạp
                  </a>
                </li>
                <li className="flex">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-gray-700"
                  >
                    Tin Tức
                  </a>
                </li>
                <li className="flex">
                  <a
                    rel="noopener noreferrer"
                    href="#footer"
                    className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-gray-700"
                  >
                    Ứng Dụng
                  </a>
                </li>
              </ul>
              <div className="items-center flex-shrink-0 hidden lg:flex cover">
                <UserNav />
              </div>
              <button className="p-4 lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              {/* responsive */}
              <label htmlFor="nav_mobile-input" className="nav_bars">
                <i className="fa-solid fa-bars" />
              </label>
            </div>
            <input
              type="checkbox"
              name=""
              className="nav_input"
              id="nav_mobile-input"
            />
            <label htmlFor="nav_mobile-input" className="over_lays"></label>
            <div className="nav_mobile">
              <label htmlFor="nav_mobile-input" className="nav-moblie-close">
                <i class="fa-solid fa-xmark"></i>
              </label>
              <div className="mt-2 ml-2"></div>
              <ul className="nav-mobile-list mt-3 ml-3">
                <li>
                  <NavLink to="/login">
                    <h1 className="self-center px-8 text_sign">Đăng Nhập</h1>
                  </NavLink>
                  <NavLink to="/signup">
                    <h1
                      className=" user_nav self-center px-8 font-semibold text_sign  text-gray-900
                        "
                      data-toggle="modal"
                      data-target="#exampleModalCenterr "
                    >
                      Đăng kí
                    </h1>
                  </NavLink>

                  <a
                    rel="noopener noreferrer"
                    href="#Card"
                    className="nav-mobile-link self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 text-gray-700 signout"
                  >
                    Lịch Chiếu
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="#tabsmovies"
                    className="nav-mobile-link self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 text-gray-700 signout"
                  >
                    Cụm Rạp
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="nav-mobile-link self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 text-gray-700 signout"
                  >
                    Tin Tức
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href="#footer"
                    className="nav-mobile-link self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 text-gray-700 signout"
                  >
                    Ứng Dụng
                  </a>
                </li>

                <li>
                  <NavLink to={"/"}>
                    <a
                      style={{ paddingTop: 16, color: "#333" }}
                      rel="noopener noreferrer"
                      href="#footer"
                      className="nav-mobile-link self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 text-gray-700 signout"
                    >
                      Trang Chủ
                    </a>
                  </NavLink>
                </li>
              </ul>
              {/* </div> */}
            </div>
          </header>
        </div>
      );
    }
  };
  return (
    // from MANBA UI
    <div>{renderContent()}</div>
  );
}
