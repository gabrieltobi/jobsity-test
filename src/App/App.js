import React, { useEffect, useState } from 'react'
import { getDaysInMonth, getWeekOfMonth, subDays, addDays, getWeeksInMonth } from 'date-fns'

import Weekday from '../Weekday/Weekday'
import Day from '../Day/Day'
import AddEditModal from '../AddEditModal/AddEditModal'

function App () {
  const [daysMap, setDaysMap] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState()
  const [selectedReminder, setSelectedReminder] = useState()
  const [weeksQty] = useState(getWeeksInMonth(new Date()))

  const fillWeekStart = (week) => {
    for (let i = week.length; i < 7; i++) {
      week.unshift({
        date: subDays(week[0].date, 1),
        otherMonth: true,
        reminders: []
      })
    }
  }

  const fillWeekEnd = (week) => {
    for (let i = week.length; i < 7; i++) {
      week.push({
        date: addDays(week[(week.length - 1)].date, 1),
        otherMonth: true,
        reminders: []
      })
    }
  }

  const openModal = (day, reminder) => {
    setSelectedDay(day)
    if (reminder) setSelectedReminder(reminder)
    setShowModal(true)
  }

  const closeModal = (reminder) => {
    if (reminder && reminder.reminder) {
      if (selectedReminder) {
        selectedReminder.reminder = reminder.reminder
        selectedReminder.city = reminder.city
        selectedReminder.time = reminder.time
        selectedReminder.color = reminder.color
      } else {
        selectedDay.reminders.push(reminder)
      }
    }

    setShowModal(false)
    setSelectedDay(null)
    setSelectedReminder(null)
  }

  useEffect(() => {
    const today = new Date()
    const daysQty = getDaysInMonth(today.getFullYear(), today.getMonth())
    const map = {}

    for (let i = 1; i <= daysQty; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i)
      const week = getWeekOfMonth(date)

      if (!map[week]) {
        map[week] = []
      }

      map[week].push({
        date,
        reminders: []
      })
    }

    const firstWeek = map[1]
    const lastWeek = map[Object.keys(map).length]
    fillWeekStart(firstWeek)
    fillWeekEnd(lastWeek)

    setDaysMap(map)
  }, [])

  return (
    <React.Fragment>
      <div className='flex'>
        <Weekday weekday='Sunday' />
        <Weekday weekday='Monday' />
        <Weekday weekday='Tuesday' />
        <Weekday weekday='Wednesday' />
        <Weekday weekday='Thursday' />
        <Weekday weekday='Friday' />
        <Weekday weekday='Saturday' />
      </div>

      <div className='flex flex-1 flex-col'>
        {Object.keys(daysMap).map((weekDay) => {
          return (
            <div key={`week-${weekDay}`} className='flex flex-1 flex-row' style={{ height: `calc(100% / ${weeksQty})` }}>
              {daysMap[weekDay].map((day) => (<Day
                key={`day-${day.date.getMonth() + 1}-${day.date.getDate()}`}
                openModal={openModal}
                {...day}
              />))}
            </div>
          )
        })}
      </div>

      <AddEditModal
        show={showModal}
        onClose={closeModal}
        selectedReminder={selectedReminder}
      />
    </React.Fragment>
  )
}

export default App
