import React from 'react'
import { isWeekend } from 'date-fns'
import contrast from 'contrast'

import './day.css'

export default function Day (props) {
    const {
        date,
        otherMonth,
        reminders,
        openModal
    } = props

    const compareFn = (a, b) => {
        return (a.time > b.time) ? 1 : -1;
    }

    const getTextColorCls = (color) => {
        if (contrast(color) === 'dark') {
            return 'text-white'
        } else {
            return 'text-black'
        }
    }

    return (
        <React.Fragment>
            <div
                role='button'
                className={`day border border-gray-600 py-1 px-2 flex flex-col
                    ${isWeekend(date) ? 'bg-gray-300' : ''}`}
                onClick={() => openModal(props)}
                data-testid={`day-${date.getMonth() + 1}-${date.getDate()}`}
            >
                <div className={`font-bold text-lg
                    ${otherMonth ? 'text-gray-500' : (isWeekend(date) ? 'text-main' : '')}`}>
                    {date.getDate()}
                </div>

                <div className='overflow-auto'>
                    {reminders.sort(compareFn).map((reminder, i) => (
                        <div
                            role='button'
                            key={i}
                            style={{ backgroundColor: reminder.color }}
                            className={`w-full p-1 break-all mb-1 ${getTextColorCls(reminder.color)}`}
                            onClick={() => openModal(props, reminder)}
                        >
                            {reminder.time} - {reminder.reminder}
                        </div>
                    ))}
                </div>
            </div>


        </React.Fragment>
    )
}