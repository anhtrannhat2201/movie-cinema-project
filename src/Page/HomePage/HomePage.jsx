import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeCarousel from "../../components/HeaderTheme/HomeCarousel";
import MultipleRowsSlick from "../../components/Rslick/MultipleRowsSlick";
import Spinner from "../../components/Spinner/Spinner";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../Redux/Actions/ActionSpinner";
import { getListMovie } from "../../Redux/Actions/ManageMoviesAction";
import { movieServ } from "../../Services/MovieService";
import ItemMovies from "./ItemMovies";
import TabsMovies from "./TabsMovies";
import "../../assets/styles/HomePage.css";

export default function HomePage() {
  // tạo state và setState bằng useState
  const [movies, setMovies] = useState([]);

  const dispatch = useDispatch();
  // setIsloading

  const { arrFilms } = useSelector((state) => state.reducerManageMovie);

  // const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //     // setIsLoading(true)
  //     dispatch(setLoadingOnAction())
  //     movieServ.getListMovie()
  //         .then((res) => {
  //             console.log(res)
  //             // setIsLoading(false)
  //             dispatch(setLoadingOffAction())
  //             setMovies(res.data.content);
  //         })
  //         .catch((err) => {
  //             // setIsLoading(false)
  //             dispatch(setLoadingOffAction())
  //             console.log(err)
  //         })
  // }, [])

  useEffect(() => {
    // setIsLoading(true)
    const action = getListMovie();
    dispatch(action);
  }, []);

  // const renderMovies = () => {
  //     return movies.map((data, index) => {
  //         return <ItemMovies key={index} data={data} />
  //     })
  // }
  return (
    <div>
      <HomeCarousel />
      <br />
      <section className="text-gray-600 body-font w-full mt-5 container res_mul">
        <div className="container px-5 py-12 shadow-2xl">
          <MultipleRowsSlick arrFilms={arrFilms} />
        </div>
      </section>
      {/* <section className="text-gray-600 body-font ">
                <div className="container">
                    <MultipleRowsSlick arrFilms={arrFilms} />
                </div>
            </section> */}
      <br />
      {/* <div className='grid grid-cols-5 gap-10 container mb-5'>
                {renderMovies()} */}
      {/* Ghi chữ hello ở đây thì nó sẽ chạy không được */}
      {/* Nằm chữ Hello nó là childer */}
      {/* Nên muốn nó chạy thì phải thêm childer vào cái file muốn lấy và cho cái props data = {} */}
      {/* VD */}
      {/* <ItemMovies>Ví Dụ Children</ItemMovies> */}
      {/* </div> */}
      <div className="container mt-5" id="tabsmovies">
        <TabsMovies />
      </div>
      {/* {isLoading && <Spinner />} */}
    </div>
  );
}
