import React, { useState, useEffect } from 'react'
import Modal from 'simple-react-modal'
import { useDebounce } from 'use-debounce'
import axios from 'axios'

export default function AddEditModal ({ show, onClose, selectedReminder }) {
    const [reminder, setReminder] = useState('')
    const [city, setCity] = useState('')
    const [time, setTime] = useState('')
    const [color, setColor] = useState('#9e9a9a')
    const [error, setError] = useState('')
    const [cityDebounced] = useDebounce(city, 1500);
    const [weather, setWeather] = useState('')

    const onSubmit = (evt) => {
        evt.preventDefault()

        if (!reminder) {
            setError('Fill the reminder')
        } else if (!city) {
            setError('Fill the city')
        } else if (!time) {
            setError('Fill the time')
        } else if (!color) {
            setError('Fill the color')
        } else {
            setError('')

            onClose({
                reminder,
                city,
                time,
                color
            })

            cleanFields()
        }
    }

    const changeReminder = (evt) => {
        setReminder(evt.target.value)
    }

    const changeCity = (evt) => {
        setCity(evt.target.value)
    }

    const changeTime = (evt) => {
        setTime(evt.target.value)
    }

    const changeColor = (evt) => {
        setColor(evt.target.value)
    }

    const fetchWeather = async (city) => {
        if (city) {
            try {
                const data = await axios({
                    method: 'get',
                    baseURL: 'http://api.openweathermap.org/data/2.5',
                    url: '/weather',
                    params: {
                        q: city,
                        units: 'metric',
                        appid: '11bc028896f50835ae301b45c67210f1'
                    }
                })
                setWeather(`${data.data.main.temp}ºC at ${city} now`)
            } catch (ex) {
                setWeather('')
            }
        } else {
            setWeather('')
        }
    }

    const cleanFields = () => {
        setReminder('')
        setCity('')
        setTime('')
        setColor('#9e9a9a')
    }

    useEffect(() => {
        fetchWeather(cityDebounced)
    }, [cityDebounced])

    useEffect(() => {
        if (selectedReminder) {
            setReminder(selectedReminder.reminder)
            setCity(selectedReminder.city)
            setTime(selectedReminder.time)
            setColor(selectedReminder.color)
        } else {
            cleanFields()
        }
    }, [selectedReminder])

    return (
        <Modal
            show={show}
            onClose={onClose}>

            <form onSubmit={onSubmit} data-testid={`form`}>
                <textarea
                    className='border border-gray-600 w-full p-2 h-24 resize-none'
                    placeholder='Write reminder...'
                    maxLength={30}
                    value={reminder}
                    onChange={changeReminder}
                    data-testid={`reminder`}
                />

                <input
                    className='border border-gray-600 w-full p-2 mb-2'
                    type='text'
                    placeholder='City'
                    value={city}
                    onChange={changeCity}
                    data-testid={`city`}
                />

                {weather && <div className='mb-2 text-sm'>
                    {weather}
                </div>}

                <div className='flex justify-center items-center mb-2'>
                    <input
                        className='border border-gray-600 mr-2'
                        type="time"
                        value={time}
                        onChange={changeTime}
                        data-testid={`time`}
                    />

                    <input
                        type='color'
                        value={color}
                        onChange={changeColor}
                        data-testid={`color`}
                    />
                </div>

                <div className='flex justify-center'>
                    <button className='bg-green-600 py-2 px-4 text-white' type='submit'>Save</button>
                </div>

                {error && <div className='mt-2 text-red-700 text-center'>
                    {error}
                </div>}
            </form>
        </Modal>
    )
}