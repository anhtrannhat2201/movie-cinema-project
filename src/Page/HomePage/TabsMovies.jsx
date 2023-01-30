import React from "react";
import { message, Tabs } from "antd";
import { useEffect } from "react";
import { movieServ } from "../../Services/MovieService";
import { useState } from "react";
import ItemMovies from "./ItemMovies";
import ItemTabsMovies from "./ItemTabsMovies";
import RenderCumRap from "./RenderCumRap";
import { useDispatch } from "react-redux";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../Redux/Actions/ActionSpinner";

export default function TabsMovies() {
  const [dataMovie, setDataMovie] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoadingOnAction());
    movieServ
      .getDataMovieBytheater()
      .then((res) => {
        dispatch(setLoadingOffAction());
        setDataMovie(res.data.content);
      })
      .catch((err) => {
        dispatch(setLoadingOffAction());
        message.error(err.response?.data);
      });
  }, []);

  const renderTabMovies = () => {
    return dataMovie.map((heThongRap, index) => {
      return (
        <Tabs.TabPane
          tab={<img className="w-16 h-16" src={heThongRap.logo} />}
          key={index}
        >
          <Tabs
            className="duration-500 "
            style={{ height: 500 }}
            tabPosition="left"
          >
            {heThongRap.lstCumRap.map((cumRap, index) => {
              return (
                <Tabs.TabPane
                  tab={
                    // RenderCumRap
                    <RenderCumRap cumRap={cumRap} />
                  }
                  key={index}
                >
                  {
                    <div
                      className="h-32 scrollbar scrollbar-thumb-blue-700 scrollbar-track-blue-300 overflow-y-scroll hover:scrollbar-thumb-green-700"
                      style={{ height: 650, overflowY: "scroll" }}
                    >
                      {cumRap.danhSachPhim.map((phim, index) => {
                        // ItemTabsMovies
                        return <ItemTabsMovies key={index} data={phim} />;
                      })}
                    </div>
                  }
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </Tabs.TabPane>
      );
    });
  };

  return (
    <div className="container flex justify-center">
      <Tabs
        style={{ height: 500, marginBottom: 300 }}
        tabPosition="left"
        defaultActiveKey="1"
      >
        {renderTabMovies()}
      </Tabs>
    </div>
  );
}
