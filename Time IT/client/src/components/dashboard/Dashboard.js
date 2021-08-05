import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Timeline from './pane1/Calendar/Timeline'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TaskList from "./pane1/Today's Tasks/TaskList"
import Clock from "./mainPane/Time/Clock"
import Profile from "./mainPane/User Details/Profile"

import './Dashboard.css'

const moment = require('moment');
moment().format();

class Dashboard extends React.Component {

    constructor(props) {

        super(props)


        this.cameFromChild = false
    }
    fun = () => {


        var tasks = []

        var allTasks = this.props.user.tasks

        var date = moment()
        date.startOf('week')
        var sd = new Date(date._d.getFullYear(), date._d.getMonth(), date._d.getDate())

        date.endOf('week')
        var ed = new Date(date._d.getFullYear(), date._d.getMonth(), date._d.getDate(), 23, 59, 59)

        allTasks.forEach(allTask => {
            var date2 = new Date(allTask.date)
            if (date2 >= sd && date2 <= ed)
                tasks.push(allTask)
        })

        this.nthDayTasks_ = [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]

        var day = moment()
        this.idx = day._d.getDay()
        day.startOf('week')
        date = day._d.getDate()



        tasks.forEach(task => {
            this.nthDayTasks_[(new Date(task.date).getDay())].push(task)
        })

    }

    render() {
        this.fun()
        return (
            <div className='dashboard'>
                <Router>
                    <Fragment>
                        <Route exact path="/dashboard" >
                            <Clock />
                            <Profile user={this.props.user} />
                            <div id="pane1">
                                <TaskList user={this.props.user} tasks={this.nthDayTasks_} idx={this.idx} />
                                <Timeline nthDayTasks={this.nthDayTasks_} />
                            </div>
                        </Route>
                    </Fragment>
                </Router>
            </div>
        )
    }
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Dashboard)