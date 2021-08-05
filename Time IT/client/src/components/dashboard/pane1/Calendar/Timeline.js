import React from 'react'
import Days from './Days'
import HourLabel from './HourLabel.js'
import DayLabel from './DayLabel.js'

import './timeline.css'

class Timeline extends React.Component {

    constructor(props) {
        super(props)
        this.nthDayTasks = this.props.nthDayTasks
    }

    render() {
        this.nthDayTasks = this.props.nthDayTasks
        return (
            <div id="testing">
            <div className='timeline'>
                <DayLabel />
                <div className='tasks-and-hours'>
                    <HourLabel />
                    <Days todo={this.nthDayTasks[0]} />
                    <Days todo={this.nthDayTasks[1]} />
                    <Days todo={this.nthDayTasks[2]} />
                    <Days todo={this.nthDayTasks[3]} />
                    <Days todo={this.nthDayTasks[4]} />
                    <Days todo={this.nthDayTasks[5]} />
                    <Days todo={this.nthDayTasks[6]} />
                </div>
            </div>
            </div>
        )
    }
}

export default Timeline