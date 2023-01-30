import React from 'react'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
export default function ItemTabsMovies(props) {

    let { data } = props
    return (
        <div className='p-3 flex space-x-5 border-b border-red-500'>
            <img className='w-28 h-36 object-cover' src={data.hinhAnh} alt="" />
            {/* flex-grow là Để ngày và giờ full khoảng chống dư ra */}
            <div className='flex-grow'>
                <p>{data.tenPhim}</p>
                {/* MAP lịch chiếu phim */}

                <div className='grid grid-cols-3 gap-5 '>
                    {data.lstLichChieuTheoPhim.slice(0, 9).map((gioChieu, index) => {
                        // sử dụng moment
                        return <NavLink to={`/checkout/${gioChieu.maLichChieu}`}>
                            <div className='p-3 rounded bg-red-600 text-white'
                                key={index}>{moment(gioChieu.ngayChieuGioChieu).format("DD-MM-YYYY ~ hh:mm")}
                            </div>
                        </NavLink>
                    })}
                </div>
            </div>
        </div>
    )
}
