
import Meta from 'antd/lib/card/Meta';
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/ItemMovies.css'

export default function ItemMovies(props) {

    let { item } = props
    return (
        <div className='container'>
            <div className="item_movies mr-2 px-6 pt-5 rounded-lg overflow-hidden text-center relative container">
                <img src={item.hinhAnh} alt={item.hinhAnh} className='h-80 object-cover rounded-md shadow-2xl' style={{ width: 227 }} />
                <div className='mt-2'>
                    <p className="title text-gray-500 font-medium" style={{ textAlign: 'initial' }}><span className='text-white bg-red-500 rounded px-1 mr-2'>C18</span>
                        {item.tenPhim}</p>
                    <p className="leading-relaxe text-gray-500 font-medium h-14" style={{ textAlign: 'initial' }}>{item.moTa.length > 80 ? <span>{item.moTa.slice(0, 60)}...</span> : <span>{item.moTa}</span>}</p>
                    <NavLink to={`/detail/${item.maPhim}`}>
                        <h2 className="text-indigo-500 inline-flex mr-5 items-center">Xem Chi Tiết
                            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg></h2>
                    </NavLink>
                </div>

            </div >
            <div className='item_responsive w-h-screen'>
                <div className='img_item'>
                    <img src={item.hinhAnh} alt={item.hinhAnh} className="h-48 object-cover rounded-md" />
                </div>
                <div className='content_item'>
                    <p className="title text-gray-500 font-medium" style={{ textAlign: 'initial' }}><span className='text-white bg-red-500 rounded px-1 mr-2'>C18</span>
                        {item.tenPhim}</p>
                    <p className="leading-relaxe text-gray-500 font-medium h-14" style={{ textAlign: 'initial' }}>{item.moTa.length > 80 ? <span>{item.moTa.slice(0, 60)}...</span> : <span>{item.moTa}</span>}</p>
                    <NavLink to={`/detail/${item.maPhim}`}>
                        <h2 className="text-indigo-500 inline-flex items-center h-14 detail">Xem Chi Tiết
                            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg></h2>
                    </NavLink>
                </div>
            </div>

        </div>
        // </div>

    );
}
