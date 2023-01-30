import React from 'react'
import Footer from '../components/HeaderTheme/Footer'
import HeaderTheme from '../components/HeaderTheme/HeaderTheme'
import HomeCarousel from '../components/HeaderTheme/HomeCarousel'
import HomePage from '../Page/HomePage/HomePage'


// Tạo ra Layout bởi vì mình phải sử dụng lại nó ở nhiều nơi 
export default function Layout(props) {
    // Cách 1 truyền bằng children
    // Tạo children rồi chuyển vào App.js
    // let { children } = props

    // Cách 2 truyền bằng Component
    let { Component } = props
    return (
        <div>
            <HeaderTheme />
            <div><Component /></div>
            <Footer />
        </div>
    )
}
