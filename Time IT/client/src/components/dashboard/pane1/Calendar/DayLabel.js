import React from 'react'

import './dayLabel.css'

const moment = require('moment');
moment().format();

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const DayLabel = () => {

    var day = moment()
    day.startOf('week')
    const dayData = []

    for (var i = 0; i < 7; i++) {
        dayData.push([
            day._d.getDate(),
            days[day._d.getDay()]
        ])
        day.add(1, 'day');
    }

    return (
        <div className="dayLabels">
            <div className="empty"></div>

            <div className="dateData">
                <p className="date">{dayData[0][0]}</p>
                <p className="day">{dayData[0][1]}</p>
            </div>

            <div className="dateData">
                <p className="date">{dayData[1][0]}</p>
                <p className="day">{dayData[1][1]}</p>
            </div>

            <div className="dateData">
                <p className="date">{dayData[2][0]}</p>
                <p className="day">{dayData[2][1]}</p>
            </div>

            <div className="dateData">
                <p className="date">{dayData[3][0]}</p>
                <p className="day">{dayData[3][1]}</p>
            </div>

            <div className="dateData">
                <p className="date">{dayData[4][0]}</p>
                <p className="day">{dayData[4][1]}</p>
            </div>

            <div className="dateData">
                <p className="date">{dayData[5][0]}</p>
                <p className="day">{dayData[5][1]}</p>
            </div>

            <div className="dateData">
                <p className="date">{dayData[6][0]}</p>
                <p className="day">{dayData[6][1]}</p>
            </div>
        </div>
    )
}

export default DayLabel