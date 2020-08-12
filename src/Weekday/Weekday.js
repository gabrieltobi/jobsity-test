import React from 'react'

export default function Weekday ({ weekday }) {
    return (
        <div className='flex-1 text-center font-bold bg-main text-white text-xl py-1'>
            {weekday}
        </div>
    )
}