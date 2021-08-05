import React from 'react'

import "./Clock.css"

const Clock = () => {

    function setTime() {

        const hourEle = document.querySelector('.hour')
        const minuteEle = document.querySelector('.minute')
        const secondEle = document.querySelector('.second')
        const timeEle = document.querySelector('.time')
        const dateEle = document.querySelector('.date')

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        const time = new Date();
        const month = time.getMonth();
        const day = time.getDay();
        const hour = time.getHours();
        const minute = time.getMinutes();
        const second = time.getSeconds();
        const date = time.getDate();
        const hoursForClock = hour % 12;

        if (hourEle != null) {
            hourEle.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 11, 0, 360)}deg)`;
            minuteEle.style.transform = `translate(-50%, -100%) rotate(${scale(minute, 0, 59, 0, 360)}deg)`;
            secondEle.style.transform = `translate(-50%, -100%) rotate(${scale(second, 0, 59, 0, 360)}deg)`;

            timeEle.innerHTML = `${hoursForClock}:${minute < 10 ? `0${minute}` : minute} ${hour >= 12 ? `PM` : `AM`}`

            dateEle.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`
        }
    }

    const scale = (num, in_min, in_max, out_min, out_max) => {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    }

    setTime()

    setInterval(setTime, 1000);

    return (
        <div className="clock-container">
            <div className="clock">
                <div className="needle hour"></div>
                <div className="needle minute"></div>
                <div className="needle second"></div>
                <div className="center-point"></div>
            </div>
            <div className="time"></div>
            <div className="date"></div>
        </div>
    )
}

export default Clock