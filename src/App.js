import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
// npm i ant design
import "antd/dist/antd.css";
// row slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import DetailPage from "./Page/DetailPage/DetailPage";
import HomePage from "./Page/HomePage/HomePage";
import LoginPage from "./Page/LoginPage/LoginPage";
import Contact from "./Page/Contact/Contact";
import Spinner from "./components/Spinner/Spinner";
import Checkout from "./Page/Checkout/Checkout";
import SignupPage from "./Page/SignupPage/SignupPage";

import LayoutHeader from "./Layout/LayoutHeader";

import DashBoard from "./Page/Admin/DashBoard/DashBoard";
import Films from "./Page/Admin/Films/Films";
import ShowTime from "./Page/Admin/ShowTime/ShowTime";
import User from "./Page/Admin/Users/User";
import Addnew from "./Page/Admin/Films/AddNew";
import EditFilms from "./Page/Admin/Films/EditFilms/EditFilms";
import AddUser from "./Page/Admin/Users/AddUser";
import EditUsers from "./Page/Admin/Users/EditUsers/EditUsers";

import LichSuVeUser from "./Page/Checkout/LichSuVeUser";
function App() {
  return (
    <div>
      <Spinner />
      {/* BrowserRouter Giống như Provider có cái này thì Routes mới hoạt động */}
      <BrowserRouter>
        {/* Phân Trang */}
        <Routes>
          <Route path="/" element={<Layout Component={HomePage} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/detail/:id"
            element={<LayoutHeader Component={DetailPage} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/checkout/:id"
            element={<Layout Component={Checkout} />}
          />
          <Route
            path="/lichsudatveuser"
            element={<Layout Component={LichSuVeUser} />}
          />
          {/* <Route path="/admin/dashboard" element={<DashBoard Component={DashBoard} />} /> */}
          <Route path="/admin/user" element={<DashBoard Component={User} />} />
          <Route
            path="/admin/user/adduser"
            element={<DashBoard Component={AddUser} />}
          />
          <Route
            path="/admin/user/edituser/:id"
            element={<DashBoard Component={EditUsers} />}
          />

          <Route
            path="/admin/films"
            element={<DashBoard Component={Films} />}
          />
          <Route
            path="/admin/addnew"
            element={<DashBoard Component={Addnew} />}
          />
          <Route
            path="/admin/films/editfilms/:id"
            element={<DashBoard Component={EditFilms} />}
          />
          <Route
            path="/admin/films/showtimes/:id"
            element={<DashBoard Component={ShowTime} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
