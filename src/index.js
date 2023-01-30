import React from "react";
import ReactDOM from "react-dom/client";
// Cấu hình realtime (websocket voi signalR)
import * as signalR from "@aspnet/signalr";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import rootReducer from "./Redux/Reducers/RootReducer";

import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
// import đa ngôn ngữ
import "./i18n";
import { BASE_URL } from "./Services/ConfigURL";

// Đoạn code để kết nối đến server lắng nghe sự kiện từ server
export const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${BASE_URL}/DatVeHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
connection
  .start()
  .then(() => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  })
  .catch((errors) => {
    console.log(errors);
  });
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
