import React from 'react'

export default function RenderCumRap(props) {

    let { cumRap } = props
    return (
        <div className='w-48 text-left'>
            <p className='text-gray-700 truncate'>
                {cumRap.tenCumRap}
            </p>
            <p className='truncate'>
                {cumRap.diaChi}
            </p>
        </div>
    )
}
